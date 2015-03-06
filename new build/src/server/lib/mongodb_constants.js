/* 
 * Default DB parameters, collections and fields.
 * @author Ron Ammar
 */

var constants= {
	"DB_HOST": "localhost",
	"DB_PORT": 27017,
	"DB_NAME": "frangipaniDB",
	"OWNER_ID":'owner',
	"ADMIN_COLLECTION_ID": "admin",
	"PATIENTS_COLLECTION_ID": "patients",
	"CURRENT_PATIENT_INDEX_FIELD": "curr_patient_index",
	"PATIENT_ID_FIELD": "patient_id",
	"PROJECT_ID_FIELD":'project_id',
	"PROJECT_ARRAY_FIELD":'tags',
	"PROJECT_COLLECTION_ID":'projects',
	"COLLECTION_ID_FIELD": "collection_id",
	"SYSTEM_NAMESPACES": "system.namespaces",
	"SERVER_CONFIGURED_ID_FIELD": "config",
	"USER_ID_FIELD":'username',
	"USER_COLLECTION_ID":'users',
	"USER_PASSWORD_FIELD": 'password',
	"USER_GOOGLE_ID_FIELD":'google',
	"USER_GOOGLE_TOKEN_FIELD":'google-token',
	"USER_GOOGLE_NAME_FIELD":'google-name',
	"USER_GOOGLE_EMAIL_FIELD":"google-email",
	"PANELS_COLLECTION_ID": "panels",
	"CURRENT_PANEL_INDEX_FIELD": "curr_panel_index",
	"PANEL_ID_FIELD": "panel_id",
	"CHROMOSOME": "chr",
	"START": "pos"
};

module.exports= constants;