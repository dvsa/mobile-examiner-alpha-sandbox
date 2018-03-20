-- Grants needed to use AWS DMS with Oracle on RDS
-- Taken unmodified from AWS documentation 
Grant SELECT ANY TABLE to TARSUAT;
Grant SELECT on ALL_VIEWS to TARSUAT;
Grant SELECT ANY TRANSACTION to TARSUAT;
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$ARCHIVED_LOG','TARSUAT','SELECT');
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$LOG','TARSUAT','SELECT');
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$LOGFILE','TARSUAT','SELECT');
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATABASE','TARSUAT','SELECT');
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$THREAD','TARSUAT','SELECT');
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PARAMETER','TARSUAT','SELECT');
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$NLS_PARAMETERS','TARSUAT','SELECT');
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$TIMEZONE_NAMES','TARSUAT','SELECT');
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$TRANSACTION','TARSUAT','SELECT');
Grant SELECT on ALL_INDEXES to TARSUAT;
Grant SELECT on ALL_OBJECTS to TARSUAT;
Grant SELECT on ALL_TABLES to TARSUAT;
Grant SELECT on ALL_USERS to TARSUAT;
Grant SELECT on ALL_CATALOG to TARSUAT;
Grant SELECT on ALL_CONSTRAINTS to TARSUAT;
Grant SELECT on ALL_CONS_COLUMNS to TARSUAT;
Grant SELECT on ALL_TAB_COLS to TARSUAT;
Grant SELECT on ALL_IND_COLUMNS to TARSUAT;
Grant SELECT on ALL_LOG_GROUPS to TARSUAT;
exec rdsadmin.rdsadmin_util.grant_sys_object('DBA_REGISTRY','TARSUAT','SELECT');
exec rdsadmin.rdsadmin_util.grant_sys_object('OBJ$','TARSUAT','SELECT');
Grant SELECT on DBA_TABLESPACES to TARSUAT;
Grant SELECT on ALL_TAB_PARTITIONS to TARSUAT;
exec rdsadmin.rdsadmin_util.grant_sys_object('ALL_ENCRYPTED_COLUMNS','TARSUAT','SELECT');
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$LOGMNR_LOGS','TARSUAT','SELECT');
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$LOGMNR_CONTENTS','TARSUAT','SELECT');
exec rdsadmin.rdsadmin_util.grant_sys_object('DBMS_LOGMNR','TARSUAT','EXECUTE');
