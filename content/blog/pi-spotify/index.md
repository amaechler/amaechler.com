---
title: Hifiberry Setup
date: 2019-10-14
---

Notes on how to setup my Raspberry Pi 3b with the Hifiberry Digi+ Standard
module.

## Setup Raspbian Buster

Download [Raspbian Buster Lite](https://www.raspberrypi.org/downloads/raspbian/) or the latest
Raspbian lite release. Use `balenaetcher` to copy the image to an SD card.

### Headless setup

Create `/boot/wpa_supplicant.conf`:

```sh
update_config=1
ctrl_interface=/var/run/wpa_supplicant

network={
  ssid="<Name of your WiFi>"
  psk="<Password for your WiFi>"
}
```

Create `ssh` and place int the root directory as well to enable ssh.

To remove the driver for the on-board soundcard and use Hifiberry Digi instead,
edit `/boot/config.txt`:

```text
# dtparam=audio=on
dtoverlay=hifiberry-digi
```

### Configuration

Boot into the raspberry, connect via ssh. Run `raspbi-config`, set a new root password.

Update all packages: `sudo apt-get update && sudo apt-get dist-upgrade`.

## Setup spotifyd

Following the [wiki](https://github.com/Spotifyd/spotifyd/wiki/Installing-on-a-Raspberry-Pi)
page, download and unpack the latest binary:

```sh
mkdir spotifyd
cd spotifyd/
wget [latest armv6 release]
unzip spotifyd-*.zip -d
```

### Configure systemd startup

```sh
$ wget https://raw.githubusercontent.com/Spotifyd/spotifyd/master/contrib/spotifyd.service
$ sudo cp spotifyd.service /etc/systemd/system/spotifyd.service

# change the execution directory to the directory created above
ExecStart=/home/pi/spotifyd/spotifyd --no-daemon

# change the executing user to pi
User=pi

# ensure the systemd service is started automatically:
$ systemctl enable spotifyd.service
```

### Configure spotifyd

```sh
# A minimal `/etc/spotifyd.conf` configuration file:
[global]
device_name = raspberrypi
bitrate = 320
```

## ALSA issues

<http://blog.scphillips.com/posts/2013/01/sound-configuration-on-raspberry-pi-with-alsa/>

Specifically

```sh
pi@raspberrypi:/etc $ amixer controls
numid=1,iface=MIXER,name='Tx Source'

pi@raspberrypi:/etc $ amixer cget numid=1
numid=1,iface=MIXER,name='Tx Source'
  ; type=ENUMERATED,access=rw------,values=1,items=2
  ; Item #0 'S/PDIF RX'
  ; Item #1 'AIF'
  : values=0

pi@raspberrypi:/etc $ amixer cset numid=1 50%
numid=1,iface=MIXER,name='Tx Source'
  ; type=ENUMERATED,access=rw------,values=1,items=2
  ; Item #0 'S/PDIF RX'
  ; Item #1 'AIF'
  : values=1
```
