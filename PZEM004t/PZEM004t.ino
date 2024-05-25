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
const char* ssid = "HUAWEI-2.4G-j7uD";
const char* password = "K49UVjte";

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

    fetchServerValues();
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

    fetchServerValues();

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

    digitalWrite(RELAY_OUTPUT_1, HIGH); // sets the digital pin 13 off
    digitalWrite(RELAY_OUTPUT_2, HIGH); // sets the digital pin 13 off
    digitalWrite(RELAY_OUTPUT_3, HIGH); // sets the digital pin 13 off
    digitalWrite(RELAY_OUTPUT_4, HIGH); // sets the digital pin 13 off
    Serial.println("LED ON.");  
    delay(500);            // waits for a second
    digitalWrite(RELAY_OUTPUT_1, LOW); // sets the digital pin 13 on
    digitalWrite(RELAY_OUTPUT_2, LOW); // sets the digital pin 13 on
    digitalWrite(RELAY_OUTPUT_3, LOW); // sets the digital pin 13 on
    digitalWrite(RELAY_OUTPUT_4, LOW); // sets the digital pin 13 on
    Serial.println("LED OFF.");
    delay(500);            // waits for a second
}

void fetchServerValues() {
    if (WiFi.status() == WL_CONNECTED) {
        WiFiClientSecure client;
        HTTPClient https;
        client.setInsecure();
        https.begin(client, "https://socketsens.vercel.app/api");
        int httpCode = https.GET();

        if (httpCode > 0) {
            String payload = https.getString();
            Serial.println("HTTP Response: " + payload);

            DynamicJsonDocument doc(2048);
            deserializeJson(doc, payload);

            name = doc["name"].as<String>();
            description = doc["description"].as<String>();
            money = doc["money"].as<float>();

            Serial.print("name: ");
            Serial.println(name);
            Serial.print("description: ");
            Serial.println(description);
            Serial.print("money: ");
            Serial.println(money);
        } else {
            Serial.println("Error on HTTP request");
        }

        https.end();
    } else {
        Serial.println("WiFi not connected");
    }
}
