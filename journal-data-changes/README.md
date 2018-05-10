# journal-data-changes
CLI app that generates changes in journal data in a TARS database.

## Pre-requisites
  * Local development laptop, using whitelisted VPN.
  * TARS Oracle database running in AWS with public IP and VPN in security group.
  * Oracle Instant Client (64-bit basic lite) installed on laptop - see [http://www.oracle.com/technetwork/topics/intel-macsoft-096467.html](download link)
    * I unzipped it in my home directory, created a ~/lib directory, and created the following links:
      * ln -s ~/instantclient_12_2/libclntsh.dylib ~/lib
      * ln -s ~/instantclient_12_2/libclntsh.dylib.12.1 ~/lib

## To Build
npm install
npm run compile
npm test

## To Use
npm start <user> <password> <connection string>*

(* *of the form: server:port/SID*)
