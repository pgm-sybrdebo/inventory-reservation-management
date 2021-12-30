import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Model } from '../../models/entities/model.entity';
import MODELS from '../data/models.json'
import { Tag } from 'src/tags/entities/tag.entity';
import { ReservationTime } from 'src/reservation-times/entities/reservation-time.entity';
import { Device } from 'src/devices/entities/device.entity';
import { DeviceStatus } from 'src/device-statuses/entities/device-status.entity';

let number = 0;

const createDevices = async () => {
  const devices = await factory(Device)().makeMany(2) as any;
  return devices;
}

define(Model, (faker: typeof Faker, context: {context}) => {
  const model = new Model();
  console.log("fact", context);
  // console.log("rt", context.tags[1]);
  const copyTags = context.context[0].slice(0);
  const newTags = copyTags.splice(faker.random.number({min: 0, max:4}), faker.random.number({min: 1, max:4}));
  const deviceStatuses = context.context[1];

  model.max_reservation_time = faker.random.number({min: 1, max: 100});
  model.name = MODELS[number].Name;
  model.description = faker.lorem.sentence();
  model.quantity = MODELS[number].quantity;
  model.brand = faker.lorem.word();
  model.specifications = 'specifications ...';
  model.tags = newTags;
  // model.devices = createDevices() as any;
  // model.tags = factory(Tag)().makeMany(2) as any;
  console.log("model1", model);
  number++;
  return model;
});


// const MODELS = [
//   {
//     "name": "DIY Pi Desktop element14",
//     "quantity": 1
//   },
//   {
//     "name": "raspberry pi Zero- version 1.3",
//     "quantity": 1
//   },
//   {
//     "name": "raspberry pi 2 ",
//     "quantity": 1
//   },
//   {
//     "name": "raspberry pi 3 ",
//     "quantity": 3
//   },
//   {
//     "name": "raspberry pi 4 4GB",
//     "quantity": 5
//   },
//   {
//     "name": "raspberry pi 4 8GB",
//     "quantity": 2
//   },
//   {
//     "name": "arduino uno",
//     "quantity": 2
//   },
//   {
//     "name": "SD card/ microSD for raspberry 32GB",
//     "quantity": 20
//   },
//   {
//     "name": "Raspberry pi voedingen ",
//     "quantity": 15
//   },
//   {
//     "name": "RBPCases: unitu RPI 4 Behuizing met Ventilator - transparant (KIWI elec KW-2532)",
//     "quantity": 2
//   },
//   {
//     "name": "Sense head",
//     "quantity": 4
//   },
//   {
//     "name": "Raspberry Pi 3 IoT Learner Kit ",
//     "quantity": 2
//   },
//   {
//     "name": "ELEMENT14: Raspberry Pi 7\" Touchescreen Display ",
//     "quantity": 2
//   },
//   {
//     "name": "pi cam V2 ",
//     "quantity": 2
//   },
//   {
//     "name": "pi cam V2 noIR",
//     "quantity": 2
//   },
//   {
//     "name": "Adafruit koper cables massas elke kleur ",
//     "quantity": 50
//   },
//   {
//     "name": "LISIPAROI infrarood LED voor RPI NoIR Camera (LISIPAROIIR-01)",
//     "quantity": 1
//   },
//   {
//     "name": "LISIPAROI witte LED voor RPI Camera (LISIPAROIIR-01)",
//     "quantity": 1
//   },
//   {
//     "name": "433Mhz Wireless Serial Transceiver Module - 1km (SEED STUDIO BH2008040005)",
//     "quantity": 2
//   },
//   {
//     "name": "Grove-NFC , NFC Atenna ( SEED STUDIO MOA191206023)",
//     "quantity": 1
//   },
//   {
//     "name": "GrovePI+",
//     "quantity": 3
//   },
//   {
//     "name": "Grove-Alcohol Sensor ",
//     "quantity": 1
//   },
//   {
//     "name": "Grove Starter Kit for IoT based on raspberry pi for MSW 10 IoT core ",
//     "quantity": 1
//   },
//   {
//     "name": "Grove speech regonizer kit for Arduino ",
//     "quantity": 1
//   },
//   {
//     "name": "Grove Gas Sensor(MQ2",
//     "quantity": 1
//   },
//   {
//     "name": "Grove Base Kit for Raspberry Pi",
//     "quantity": 1
//   },
//   {
//     "name": "Grove indoor Environment Kit for intel edison",
//     "quantity": 1
//   },
//   {
//     "name": "Grove- Infrared Emitter ",
//     "quantity": 3
//   },
//   {
//     "name": "Grove-I2C Touch Sensor ",
//     "quantity": 1
//   },
//   {
//     "name": "Grove-Sunlight Sensor ",
//     "quantity": 1
//   },
//   {
//     "name": "Grove-Electricity Sensor ",
//     "quantity": 1
//   },
//   {
//     "name": "Grove - BLE ",
//     "quantity": 3
//   },
//   {
//     "name": "Grove-Digital Light Sensor",
//     "quantity": 1
//   },
//   {
//     "name": "Grove - Universal 4 Pin Buckled 30cm Cable ",
//     "quantity": 12
//   },
//   {
//     "name": "Grove-BLE (HM-11)",
//     "quantity": 1
//   },
//   {
//     "name": "PIMORONI Electrical Near-field 3D/Gesture Sensor HAT for the Raspberry Pi B+",
//     "quantity": 1
//   },
//   {
//     "name": "Jumper Wire (SKU JM-MF-40-20)",
//     "quantity": 1
//   },
//   {
//     "name": "ADAFRUIT MicroLipo USB Charger (P1304)",
//     "quantity": 1
//   },
//   {
//     "name": "druk knop red",
//     "quantity": 2
//   },
//   {
//     "name": "druk knop green",
//     "quantity": 2
//   },
//   {
//     "name": "druk knop white ",
//     "quantity": 2
//   },
//   {
//     "name": "druk knop blue ",
//     "quantity": 1
//   },
//   {
//     "name": "ADAFRUIT 3cm 4-digi 7-Segment Display met I2C Backpack- Groen (ASA-1268)",
//     "quantity": 1
//   },
//   {
//     "name": "NFC-stickers rond ",
//     "quantity": 10
//   },
//   {
//     "name": "universal NFC-stickers rond (NTAG203 - transparant)",
//     "quantity": 10
//   },
//   {
//     "name": "NFC-stickers NFC tag On-metal",
//     "quantity": 10
//   },
//   {
//     "name": "RFID Waterproof tags 125KHz",
//     "quantity": 10
//   },
//   {
//     "name": "Windows NFC/RFID USB Reader",
//     "quantity": 1
//   },
//   {
//     "name": "13.56MHz RFID/NFC Card (P359)",
//     "quantity": 1
//   },
//   {
//     "name": "ADAFRUIT RGB backlight negative LCD 20x4 (P498)",
//     "quantity": 30
//   },
//   {
//     "name": "ADAFRUIT Display 1.3\" 128x64 OLED (P938C)",
//     "quantity": 1
//   },
//   {
//     "name": "Grove-Universal 4Pon Buckled 30cm Cable ",
//     "quantity": 5
//   },
//   {
//     "name": "Breadboard (ZY-W204)",
//     "quantity": 2
//   },
//   {
//     "name": "Jumperwires in doosje (KW-1609)",
//     "quantity": 100
//   },
//   {
//     "name": "Premium Jumperwires op strip 20cm (JW-MM-40-20)",
//     "quantity": 40
//   },
//   {
//     "name": "WINSTAR (WH2004A-CTI-JT#)",
//     "quantity": 1
//   },
//   {
//     "name": "Chromecast ",
//     "quantity": 1
//   },
//   {
//     "name": "Chromecast Ultra",
//     "quantity": 1
//   },
//   {
//     "name": "Apple tv",
//     "quantity": 1
//   },
//   {
//     "name": "COMPONENT KIT CK-1000 (Resitors, capacitors, semiconductors, LEDs, inductors, Miscellaneous, Wires) ",
//     "quantity": 1
//   },
//   {
//     "name": "10K Ohm Resitors",
//     "quantity": 3
//   },
//   {
//     "name": "P2N2222A",
//     "quantity": 2
//   },
//   {
//     "name": "ADAFRUIT Round Force-Sensitive Resistor FSR (P166)",
//     "quantity": 2
//   },
//   {
//     "name": "ADAFRUIT Thin Conductive Thread -ply (P640)",
//     "quantity": 1
//   },
//   {
//     "name": "Flora RGB NeoPixel v2 ",
//     "quantity": 4
//   },
//   {
//     "name": "ADAFRUIT Extra Tall Stacking Header (P1979)",
//     "quantity": 1
//   },
//   {
//     "name": "ADAFRUIT Flora GPS Module version 1.0",
//     "quantity": 1
//   },
//   {
//     "name": "ADAFRUIT Flora Wearable ultimate GPS Module (P1059)",
//     "quantity": 1
//   },
//   {
//     "name": "ADAFRUIT IR Distance sensor 20cm-150cm (P1031)",
//     "quantity": 1
//   },
//   {
//     "name": "ADAFRUIT Flora V3 ( P659)",
//     "quantity": 1
//   },
//   {
//     "name": "OctoCam ",
//     "quantity": 1
//   },
//   {
//     "name": "XLoBorg",
//     "quantity": 1
//   },
//   {
//     "name": "BARE CONDUCTIVE electric paint  ",
//     "quantity": 1
//   },
//   {
//     "name": "LISIPAROI Flash ring for Raspberry Pi camera module",
//     "quantity": 2
//   },
//   {
//     "name": "MONOPRICE PID: USB-MicroUSB5-03",
//     "quantity": 1
//   },
//   {
//     "name": "UNICORN HAT  64 super-bright RGB LEDs in a hand 8x8 matrix that sits on top of your Raspberry PI 2/B+",
//     "quantity": 1
//   },
//   {
//     "name": "ADAFRUIT Ultimate GPS breakout - 66 channel (P746)",
//     "quantity": 1
//   },
//   {
//     "name": "PN7150 NFC controller SBC kit for Raspberry pi ",
//     "quantity": 2
//   },
//   {
//     "name": "Hihome smart wifi plug (WPP-16S1)",
//     "quantity": 50
//   },
//   {
//     "name": "OSRAM Smart+ plug",
//     "quantity": 3
//   },
//   {
//     "name": "PIMORONI Explorer hat pro parts kit ",
//     "quantity": 2
//   },
//   {
//     "name": "LittleBits education codekit ",
//     "quantity": 1
//   },
//   {
//     "name": "Graspio cloudio for raspberry pi ",
//     "quantity": 1
//   },
//   {
//     "name": "BBC Micro:bit club kit  ",
//     "quantity": 1
//   },
//   {
//     "name": "TINKERKIT starter kit",
//     "quantity": 1
//   },
//   {
//     "name": "PiFace Control & Display ",
//     "quantity": 1
//   },
//   {
//     "name": "ADAFRUIT PITFT plus assembeld 480x320 3.5\" TFT + touchscreen for raspberry pi",
//     "quantity": 1
//   },
//   {
//     "name": "NeoPixel Diffused 5mm LED (P1938)",
//     "quantity": 5
//   },
//   {
//     "name": "Breadboard ander model",
//     "quantity": 20
//   },
//   {
//     "name": "T-bone",
//     "quantity": 1
//   }
//  ]