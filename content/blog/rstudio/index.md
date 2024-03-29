---
title: How to run R and RStudio inside Docker
date: 2017-07-20
---

## Setup base image

```sh
# Make sure you are running against a linux host
$ docker version

# Pull one of the rocker-org images
$ docker pull rocker/tidyverse

# Start an RStudio instance accessible in your browser
$ docker run -d -p 8787:8787 rocker/tidyverse

# Point your browser to `http://localhost:8787/`, login with `rstudio:rstudio` and enjoy
```

## Setup environment

In my case, I wanted to setup the R environment as described in the
_UT.7.11x Foundations of Data Analysis - Part 1_ course.

```sh
# Download the SDSFoundations package to your local hard drive, in my case `/Users/amaechler/Downloads`

# Run your docker container
$ docker run -d -p 8787:8787 -v /Users/amaechler/Downloads:/downloads-e ROOT=TRUE rocker/tidyverse

# Install the package in R
install.packages("/downloads/SDSFoundations_1.4.tar.gz", repos = NULL, type = "source")

# Commit the changed container
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS              PORTS                    NAMES
40fed3ecce02        rocker/tidyverse    "/init"             About a minute ago   Up About a minute   0.0.0.0:8787->8787/tcp   cranky_kirch

$ docker commit 40fed3ecce02 amaechler/ut.711x:v1
```

## Run

```sh
# Now start your newly committed container:
$ docker run -d -p 8787:8787 -v /Users/amaechler/Documents/Personal/Courses/ut.7.11x_data_analysis:/home/rstudio/ut.711x --name rstudio  amaechler/ut.711x:v1

# To stop the container, run
$ docker stop rstudio
```

## Wiki

More details are available on the [rocker-org wiki](https://github.com/rocker-org/rocker/wiki/Using-the-RStudio-image).
