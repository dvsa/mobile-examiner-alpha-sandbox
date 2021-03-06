# journal-data-changes
CLI app that generates changes in journal data in an Oracle TARS database.

## Pre-requisites
  * Local development laptop, using whitelisted VPN.
  * Node (v 8.9.x)
  * npm (v 6.0.x)
  * Security
    * [Git secrets](https://github.com/awslabs/git-secrets)
    * [ScanRepo](https://github.com/UKHomeOffice/repo-security-scanner)
  * TARS Oracle database running in AWS with public IP and VPN in security group.
  * Oracle Instant Client (64-bit basic lite) installed on laptop - see [download link](http://www.oracle.com/technetwork/topics/intel-macsoft-096467.html)
    * I unzipped it in my home directory, created a `~/lib` directory, and created the following links:
      * `ln -s ~/instantclient_12_2/libclntsh.dylib ~/lib`
      * `ln -s ~/instantclient_12_2/libclntsh.dylib.12.1 ~/lib`

## To Build
```
npm install
npm run compile
npm test
```

## To Use
```
npm start <user> <password> <connection string>*
```

(* *of the form: server:port/SID*)
