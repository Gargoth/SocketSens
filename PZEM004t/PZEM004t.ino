/*
Copyright (c) 2021 Jakub Mandula

Example of using one PZEM module with Software Serial interface.
================================================================

If only RX and TX pins are passed to the constructor, software 
serial interface will be used for communication with the module.

*/

#include <PZEM004Tv30.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <string.h>
#include <Arduino.h>

#if defined(ESP32)
    #error "Software Serial is not supported on the ESP32"
#endif

/* Use software serial for the PZEM
 * Pin 12 Rx (Connects to the Tx pin on the PZEM)
 * Pin 13 Tx (Connects to the Rx pin on the PZEM)
*/
#if !defined(PZEM_RX_PIN) && !defined(PZEM_TX_PIN)
#define PZEM_RX_PIN 12
#define PZEM_TX_PIN 13
#define RELAY_OUTPUT_1 3
#define RELAY_OUTPUT_2 14
#define RELAY_OUTPUT_3 4
#define RELAY_OUTPUT_4 5

#endif

// API URL
const char* api = "https://socketsens.vercel.app/api";

// WiFi credentials
// const char* ssid = "DragonsDen";
// const char* password = "iotcup2024fusrodah";
// const char* ssid = "Ceej Galaxy Note 10+";
// const char* password = "secretjokelanghehe";
// const char* ssid = "Ceej Galaxy Note 10+";
// const char* password = "secretjokelanghehe";
const char* ssid = "s3wifi";
const char* password = "IceBukoPie2019";
// const char* ssid = "HUAWEI-2.4G-j7uD";
// const char* password = "K49UVjte";
// const char* ssid = "jee-uhn";
// const char* password = "jian2324";


SoftwareSerial pzemSWSerial(PZEM_RX_PIN, PZEM_TX_PIN);
PZEM004Tv30 pzem(pzemSWSerial);
//PZEM004Tv30 pzem(Serial);

float powerThreshold = 230;

int socketSched[2][4];
int timeElapsed;
int lastSuccessfulGET = 0;
int lastSchedChange = -45000;

int schedChange_1 = 0;
int schedChange_2 = 0;
int schedChange_3 = 0;
int schedChange_4 = 0;

void setup() {
    /* Debugging serial */
    Serial.begin(115200);
    pinMode(RELAY_OUTPUT_1, OUTPUT);    // sets the digital pin 13 as output
    pinMode(RELAY_OUTPUT_2, OUTPUT);    // sets the digital pin 13 as output
    pinMode(RELAY_OUTPUT_3, OUTPUT);    // sets the digital pin 13 as output
    pinMode(RELAY_OUTPUT_4, OUTPUT);    // sets the digital pin 13 as output

    // Initialize Scheduling Values with -1
    for (int i = 0; i < 2; i++) {
      for (int j = 0; j < 4; j++) {
        socketSched[i][j] = -5000000;
      }
    }

    // We start by connecting to a WiFi network
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    pzem.resetEnergy();
}

// Function to convert UTC to Philippine time
int convertTime(int inputTime) {
  const int baseTime = 28800000;
  const int dayTime = 86400000;

  int difference = inputTime - baseTime;

  if (difference >= 0) {
    return difference;
  } else {
    return difference + dayTime;
  }
}

// GET Request function
String GetRequest(WiFiClientSecure client) {
  HTTPClient https;
  https.begin(client, api);
  int httpCode = https.GET();

  if (httpCode > 0) {
      Serial.println("Successful HTTP GET Request");
      String payload = https.getString();
      return payload;
  }
  Serial.println("Error on HTTP GET request");
  return "";
}

// POST Request function
String PostRequest(WiFiClientSecure client, String content) {
  HTTPClient https;
  https.begin(client, api);
  https.addHeader("Content-Type", "application/json");
  int httpCode = https.POST(content);

  if (httpCode > 0) {
      Serial.println("Successful HTTP POST Request");
      String payload = https.getString();
      return payload;
  }
  Serial.println("Error on HTTP POST request");
  return "";
}

void UpdateWithServer(WiFiClientSecure client) {
  // GET Request from web server
  for (int i = 0; i < 10; i++) {
    delay(250);
    String payload = GetRequest(client);
    DynamicJsonDocument doc(2048);
    deserializeJson(doc, payload);

    Serial.println("GET Request received:");
    Serial.println(payload);

    float energyLimit = 1000000;

    if (payload == "") {
      timeElapsed = millis() - lastSuccessfulGET; 
    } else {
      float energyLimit = doc["energyLimit"].as<float>();
      if (energyLimit == 0.000) {
        energyLimit == 1000000;
      }
      int relayPin_1 = doc["relayPin_1"].as<int>();
      int relayPin_2 = doc["relayPin_2"].as<int>();
      int relayPin_3 = doc["relayPin_3"].as<int>();
      int relayPin_4 = doc["relayPin_4"].as<int>();

      digitalWrite(RELAY_OUTPUT_1, relayPin_1);
      digitalWrite(RELAY_OUTPUT_2, relayPin_2);
      digitalWrite(RELAY_OUTPUT_3, relayPin_3);
      digitalWrite(RELAY_OUTPUT_4, relayPin_4);

      socketSched[0][0] = doc["socketSchedOff_1"].as<int>();
      socketSched[0][1] = doc["socketSchedOff_2"].as<int>();
      socketSched[0][2] = doc["socketSchedOff_3"].as<int>();
      socketSched[0][3] = doc["socketSchedOff_4"].as<int>();

      socketSched[1][0] = doc["socketSchedOn_1"].as<int>();
      socketSched[1][1] = doc["socketSchedOn_2"].as<int>();
      socketSched[1][2] = doc["socketSchedOn_3"].as<int>();
      socketSched[1][3] = doc["socketSchedOn_4"].as<int>();
      lastSuccessfulGET = millis();
      timeElapsed = 0;
    }

    schedChange_1 = 0;
    schedChange_2 = 0;
    schedChange_3 = 0;
    schedChange_4 = 0;

    int wasSchedChanged = 0;

    // Check if a scheduled on and off needs to be made
    if (millis() - lastSchedChange >= 45000) {
      for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 4; j++) {
          int schedTime = convertTime(socketSched[i][j]);
          // int schedTime = socketSched[i][j];
          if ((((schedTime - timeElapsed) < 0) && ((schedTime - timeElapsed) >= -30000)) || schedTime >= 86370000) {
            wasSchedChanged = 1;
            lastSchedChange = millis();
            if (i == 0) {
              if (j == 0) {
                digitalWrite(RELAY_OUTPUT_1, 1);
                schedChange_1 = 1;
              } else if (j == 1) {
                digitalWrite(RELAY_OUTPUT_2, 1);
                schedChange_2 = 1;
              } else if (j == 2) {
                digitalWrite(RELAY_OUTPUT_3, 1);
                schedChange_3 = 1;
              } else if (j == 3) {
                digitalWrite(RELAY_OUTPUT_4, 1);
                schedChange_4 = 1;
              }
            } else if (i == 1) {
              if (j == 0) {
                digitalWrite(RELAY_OUTPUT_1, 0);
                schedChange_1 = 1;
              } else if (j == 1) {
                digitalWrite(RELAY_OUTPUT_2, 0);
                schedChange_2 = 1;
              } else if (j == 2) {
                digitalWrite(RELAY_OUTPUT_3, 0);
                schedChange_3 = 1;
              } else if (j == 3) {
                digitalWrite(RELAY_OUTPUT_4, 0);
                schedChange_4 = 1;
              }
            }
          }
        }
      }
    }

    if (wasSchedChanged) {
      // Emergency Post Message when a scheduled change has been done
      int relayPin_1 = digitalRead(RELAY_OUTPUT_1);
      int relayPin_2 = digitalRead(RELAY_OUTPUT_2);
      int relayPin_3 = digitalRead(RELAY_OUTPUT_3);
      int relayPin_4 = digitalRead(RELAY_OUTPUT_4);
      float current = pzem.current();
      float power = pzem.power();
      float energy = pzem.energy();
      String content = "{";
      content += "\"relayPin_1\":" + String(relayPin_1) + ",";
      content += "\"relayPin_2\":" + String(relayPin_2) + ",";
      content += "\"relayPin_3\":" + String(relayPin_3) + ",";
      content += "\"relayPin_4\":" + String(relayPin_4) + ",";
      if (isnan(current)) {
        content += "\"current\":" + String(-1) + ",";
        content += "\"power\":" + String(-1) + ",";
        content += "\"energy\":" + String(-1) + ",";
      } else {
        content += "\"current\":" + String(current) + ",";
        content += "\"power\":" + String(power) + ",";
        content += "\"energy\":" + String(energy, 3) + ",";
      }
      content += "\"schedChange_1\":" + String(schedChange_1) + ",";
      content += "\"schedChange_2\":" + String(schedChange_2) + ",";
      content += "\"schedChange_3\":" + String(schedChange_3) + ",";
      content += "\"schedChange_4\":" + String(schedChange_4);
      content += "}";
      Serial.print("POST Message: "); Serial.println(content);
      payload = PostRequest(client, content);
      if (payload != "") {
        Serial.println("Server returned:");
        Serial.println(payload);
      } else {
        Serial.println("POST Request received:");
        Serial.println(payload);
      }
    }

    // Notify if Energy Limit has been reached
    if ( energyLimit <= pzem.energy() ) {
      String energyLimitMessage = "ENERGY LIMIT OF " + String(energyLimit, 3) + " HAS BEEN REACHED";
      Serial.println(energyLimitMessage);
    }

    if ( powerThreshold <= pzem.power() ) {
      int relayPin_1 = 1;
      int relayPin_2 = 1;
      int relayPin_3 = 1;
      int relayPin_4 = 1;
      digitalWrite(RELAY_OUTPUT_1, relayPin_1);
      digitalWrite(RELAY_OUTPUT_2, relayPin_2);
      digitalWrite(RELAY_OUTPUT_3, relayPin_3);
      digitalWrite(RELAY_OUTPUT_4, relayPin_4);

      String powerThresholdMessage = "POWER THRESHOLD OF " + String(powerThreshold) + " HAS BEEN REACHED";
      Serial.println(powerThresholdMessage);

      // Emergency Post Message if Power Threshold has been reached
      relayPin_1 = digitalRead(RELAY_OUTPUT_1);
      relayPin_2 = digitalRead(RELAY_OUTPUT_2);
      relayPin_3 = digitalRead(RELAY_OUTPUT_3);
      relayPin_4 = digitalRead(RELAY_OUTPUT_4);
      float current = pzem.current();
      float power = pzem.power();
      float energy = pzem.energy();
      String content = "{";
      content += "\"relayPin_1\":" + String(relayPin_1) + ",";
      content += "\"relayPin_2\":" + String(relayPin_2) + ",";
      content += "\"relayPin_3\":" + String(relayPin_3) + ",";
      content += "\"relayPin_4\":" + String(relayPin_4) + ",";
      if (isnan(current)) {
        content += "\"current\":" + String(-1) + ",";
        content += "\"power\":" + String(-1) + ",";
        content += "\"energy\":" + String(-1) + ",";
      } else {
        content += "\"current\":" + String(current) + ",";
        content += "\"power\":" + String(power) + ",";
        content += "\"energy\":" + String(energy, 3) + ",";
      }
      content += "\"schedChange_1\":0,";
      content += "\"schedChange_2\":0,";
      content += "\"schedChange_3\":0,";
      content += "\"schedChange_4\":0";
      content += "}";
      Serial.print("POST Message: "); Serial.println(content);
      payload = PostRequest(client, content);
      if (payload != "") {
        Serial.println("Server returned:");
        Serial.println(payload);
      } else {
        Serial.println("POST Request received:");
        Serial.println(payload);
      }
    }
  }
  
  // POST Request
  int relayPin_1 = digitalRead(RELAY_OUTPUT_1);
  int relayPin_2 = digitalRead(RELAY_OUTPUT_2);
  int relayPin_3 = digitalRead(RELAY_OUTPUT_3);
  int relayPin_4 = digitalRead(RELAY_OUTPUT_4);
  float current = pzem.current();
  float power = pzem.power();
  float energy = pzem.energy();

  String content = "{";
  content += "\"relayPin_1\":" + String(relayPin_1) + ",";
  content += "\"relayPin_2\":" + String(relayPin_2) + ",";
  content += "\"relayPin_3\":" + String(relayPin_3) + ",";
  content += "\"relayPin_4\":" + String(relayPin_4) + ",";
  if (isnan(current)) {
    content += "\"current\":" + String(-1) + ",";
    content += "\"power\":" + String(-1) + ",";
    content += "\"energy\":" + String(-1) + ",";
  } else {
    content += "\"current\":" + String(current) + ",";
    content += "\"power\":" + String(power) + ",";
    content += "\"energy\":" + String(energy, 3) + ",";
  }
  content += "\"schedChange_1\":" + String(schedChange_1) + ",";
  content += "\"schedChange_2\":" + String(schedChange_2) + ",";
  content += "\"schedChange_3\":" + String(schedChange_3) + ",";
  content += "\"schedChange_4\":" + String(schedChange_4);
  content += "}";
  Serial.print("POST Message: "); Serial.println(content);
  String payload = PostRequest(client, content);
  if (payload != "") {
    Serial.println("Server returned:");
    Serial.println(payload);
  } else {
    Serial.println("POST Request received:");
    Serial.println(payload);
  }
}

void loop() {

    // Read the data from the sensor
    float voltage = pzem.voltage();
    float current = pzem.current();
    float power = pzem.power();
    float energy = pzem.energy();
    float frequency = pzem.frequency();
    float pf = pzem.pf();

    if (WiFi.status() == WL_CONNECTED) {
        WiFiClientSecure client;
        client.setInsecure();
        UpdateWithServer(client);
    } else {
        Serial.println("WiFi not connected");
    }

    // Check if the data is valid
    if (isnan(voltage)){
        Serial.println("Error reading voltage");
    } else if (isnan(current)) {
        Serial.println("Error reading current");
    } else if (isnan(power)) {
        Serial.println("Error reading power");
    } else if (isnan(energy)) {
        Serial.println("Error reading energy");
    } else if (isnan(frequency)) {
        Serial.println("Error reading frequency");
    } else if (isnan(pf)) {
        Serial.println("Error reading power factor");
    } else {

        // Print the values to the Serial console
        Serial.print("Voltage: ");      Serial.print(voltage);      Serial.println("V");
        Serial.print("Current: ");      Serial.print(current);      Serial.println("A");
        Serial.print("Power: ");        Serial.print(power);        Serial.println("W");
        Serial.print("Energy: ");       Serial.print(energy,3);     Serial.println("kWh");
        Serial.print("Frequency: ");    Serial.print(frequency, 1); Serial.println("Hz");
        Serial.print("PF: ");           Serial.println(pf);
    }

    Serial.println();
}
