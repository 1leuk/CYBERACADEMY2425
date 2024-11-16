#define BLYNK_TEMPLATE_ID "TMPL6q_0hDccO"
#define BLYNK_TEMPLATE_NAME "oleh2"
#define BLYNK_AUTH_TOKEN "of0oKc4FfOPOqtz6d_D8778lEK-kXd8q"

#include <WiFi.h>
#include <BlynkSimpleEsp32.h>
#include <DHT.h>

// Define pin dan konstant
#define DHTPIN 4
#define DHTTYPE DHT22
#define POTENTIOMETER_PIN 36
#define LED_PIN 2

// Inisialisasi sensor dht
DHT dht(DHTPIN, DHTTYPE);

// WiFi
char auth[] = BLYNK_AUTH_TOKEN;
char ssid[] = "Wokwi-GUEST"; 
char pass[] = "";

BlynkTimer timer;

void sendSensorData() {
  int potValue = analogRead(POTENTIOMETER_PIN);
  float temperature = map(potValue, 0, 4095, 0, 50); // Asumsi range temp 0-50 C
  float humidity = map(potValue, 0, 4095, 20, 80); // Kelembapan 20-80

  // Send live perubahan ke terminal
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print(" °C, Humidity: ");
  Serial.print(humidity);
  Serial.print(" %, Potentiometer: ");
  Serial.println(potValue);
  // Send data to Blynk
  Blynk.virtualWrite(V0, temperature);
  Blynk.virtualWrite(V1, humidity);
  Blynk.virtualWrite(V2, potValue);

    if (temperature > 30) {
    digitalWrite(LED_PIN, HIGH); // LED nyala ketika temp diatas 30
  } else {
    digitalWrite(LED_PIN, LOW);
  }
}

void connectToWiFi() {
  WiFi.begin(ssid, pass);
  Serial.print("Connecting to WiFi...");
  int retryCount = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
    retryCount++;
    // Jika gbs diatas 20x maka restart
    if (retryCount > 20) {
      Serial.println("\nFailed to connect to WiFi. Restarting...");
      ESP.restart(); // restart board jika gagal
  }
  Serial.println("\nConnected to WiFi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}
}


void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(LED_PIN, OUTPUT);
  connectToWiFi();
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
  timer.setInterval(1000L, sendSensorData);
}

void loop() {
  Blynk.run();  
  timer.run();}
