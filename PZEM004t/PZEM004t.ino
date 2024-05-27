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
#define PZEM_RX_PIN 0
#define PZEM_TX_PIN 1
#define RELAY_OUTPUT_1 4
#define RELAY_OUTPUT_2 5
#define RELAY_OUTPUT_3 12
#define RELAY_OUTPUT_4 13

#endif

// WiFi credentials
const char* ssid = "Ceej Galaxy Note 10+";
const char* password = "secretjokelanghehe";

SoftwareSerial pzemSWSerial(PZEM_RX_PIN, PZEM_TX_PIN);
PZEM004Tv30 pzem(pzemSWSerial);
//PZEM004Tv30 pzem(Serial);

//Dummy data 
String name = "";
String description = "";
float money = 0;

void setup() {
    /* Debugging serial */
    Serial.begin(115200);
    pinMode(RELAY_OUTPUT_1, OUTPUT);    // sets the digital pin 13 as output
    pinMode(RELAY_OUTPUT_2, OUTPUT);    // sets the digital pin 13 as output
    pinMode(RELAY_OUTPUT_3, OUTPUT);    // sets the digital pin 13 as output
    pinMode(RELAY_OUTPUT_4, OUTPUT);    // sets the digital pin 13 as output

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

}

String GetRequest(WiFiClientSecure client) {
  HTTPClient https;
  https.begin(client, "https://socketsens.vercel.app/api");
  int httpCode = https.GET();

  if (httpCode > 0) {
      Serial.println("Successful HTTP GET Request");
      String payload = https.getString();
      return payload;
  }
  Serial.println("Error on HTTP GET request");
  return "";
}

String PostRequest(WiFiClientSecure client, String payload) {
  HTTPClient https;
  https.begin(client, "https://socketsens.vercel.app/api");
  https.addHeader("Content-Type", "application/json");
  int httpCode = https.POST(payload);

  if (httpCode > 0) {
      Serial.println("Successful HTTP POST Request");
      String payload = https.getString();
      return payload;
  }
  Serial.println("Error on HTTP POST request");
  return "";
}

void UpdateWithServer(WiFiClientSecure client) {
  String content = "{}";
  String payload = PostRequest(client, content);
  if (payload != "") {
    Serial.println("Server returned:");
    Serial.println(payload);
  }
}

void loop() {
         
    Serial.print("Custom Address:");
    Serial.println(pzem.readAddress(), HEX);

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
    if(isnan(voltage)){
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
    delay(1000);
}
