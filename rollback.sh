#!/bin/bash
RACK_ENV=development rake rollback
RACK_ENV=test rake rollback
