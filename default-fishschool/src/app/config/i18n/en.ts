// USA
export const locale = {
	lang: 'en',
	data: {
		TRANSLATOR: {
			SELECT: 'Select your language',
		},
		MENU: {
			NEW: 'new',
			ACTIONS: 'Actions',
			CREATE_POST: 'Create New Post',
			REPORTS: 'Reports',
			APPS: 'Apps',
			DASHBOARD: 'Dashboard',
			FISH_SCHOOLS: 'Fish schools',
			FISH_SCHOOLS_NEW: 'New',
			FISH_SCHOOLS_TOGGLE_STATUS: 'Toggle Status',
			SOLD_FISH_SCHOOL: 'Sold',
			FARM: 'Farm',
			FOOD_NAMES: 'Food Names',
			DELIVERY_NOTES: 'Delivery Notes',
		},
		AUTH: {
			GENERAL: {
				OR: 'Or',
				SUBMIT_BUTTON: 'Submit',
				NO_ACCOUNT: 'Don\'t have an account?',
				SIGNUP_BUTTON: 'Signup',
				FORGOT_BUTTON: 'Forgot Password',
				BACK_BUTTON: 'Back',
				PRIVACY: 'Privacy',
				LEGAL: 'Legal',
				CONTACT: 'Contact',
			},
			LOGIN: {
				TITLE: 'Login Account',
				BUTTON: 'Sign In',
				USERNAME: 'Username',
				PASSWORD: 'Password'
			},
			FORGOT: {
				TITLE: 'Forgotten Password?',
				DESC: 'Enter your email to reset your password',
			},
			REGISTER: {
				TITLE: 'Sign Up',
				DESC: 'Enter your details to create your account',
				SUCCESS: 'Your account has been successfuly registered. Please use your registered account to login.'
			},
			INPUT: {
				EMAIL: 'Email',
				FULLNAME: 'Fullname',
				PASSWORD: 'Password',
				CONFIRM_PASSWORD: 'Confirm Password',
			},
			VALIDATION: {
				INVALID: '{{name}} is not valid',
				REQUIRED: '{{name}} is required',
				MIN_LENGTH: '{{name}} minimum length is {{min}}',
				AGREEMENT_REQUIRED: 'Accepting terms & conditions are required',
				NOT_FOUND: 'The requested {{name}} is not found',
				INVALID_LOGIN: 'The login detail is incorrect',
				CONNECTION_FAILURE: 'Unable to connect to the server, please try again later'
			},
		},
		GENERAL: {
			F_C_R: 'F.C.R.',
			DEAD: 'Dead',
			AGE: 'Age',
		},
		DASHBOARD: {
			FARM_SUMMARY: 'Farm summary',
			SUMMARY: 'Summary',
			AVG_WEIGHT: 'Average Weight',
			NUM_OF_FISH: '# Of Fish',
			FOOD_WEIGHT: 'Food Weight',
			GIVEN_FOOD: 'Given Food',
			PLAN_FOOD: 'Plan Food',
			QUANTITY: 'Quantity',
			FEED_DATE: 'Feed Date',
			FOOD_TYPE: 'Food Type',
			DETAILS: {
				SUMMARY_HEADER: 'Summary Details',
				NAME: 'Name',
				FEED_DATE: 'Feed Date',
			},
			SUMMARY_DATE: 'Summary Date',
		},
		VALIDATION: {
			LOAD_FS_FAILURE: 'Unable to load Fish School records, please try again later',
			LOAD_FOOD_FAILURE: 'Unable to load Food records, please try again later',
			LOAD_FOOD_DELIVERY_NOTES_FAILURE: 'Unable to load Delivery Notes records, please try again later',
			REQUIRED_FIELD: '{{name}} is required',
			MIN_LENGTH_FIELD: '{{name}} minimum length is {{min}}',
			NO_RECORDS: 'No records to display',
			NO_CHANGES: 'No changes detected, will not update records',
		},
		FARM: {
			ACTUAL_GIVEN_FOOD: 'Actual Given Food',
			MORTALITY: 'Mortality',
		},
		FISH_SCHOOL: {
			UPDATE_WITHOUT_RECORDS: 'Your Fish school data not yet visible, update cannot be done',
			NEW_FISH_SCHOOL: 'New Fish School',
			RENAME_FISH_SCHOOL: 'Rename School',
			SOLD_ACTIVE_FISH_SCHOOL: 'Sold/Active School',
			FILTERS: {
				SCHOOL_NAME: 'School name',
				SOLD_SCHOOL_NAME: 'Sold School name',
				CHOOSE_SCHOOL_NAME: 'Choose School Name',
				START_TYPING_NAME: 'Start typing name',
				SCHOOL_NAME_NOT_FOUND: 'School name not found',
				STATUS: {
					ACTIVE: 'Active',
					INACTIVE: 'Inactive',
					SOLD: 'Sold'
				},
				FOOD_DATE: 'Start date',
				NUM_OF_DAYS: '# of days',
				PANEL: {
					HEADER: 'Fish school filters',
					DESCRIPTION: 'Choose Filters',
					SOLD_HEADER: 'Sold Fish school filters',
				}
			},
			TABLE: {
				SELECTED_DATE: 'Selected Date',
				AGE: 'Age',
				MANUAL_WEIGHT: 'Manual Weight',
				AVERAGE_GRAMS: 'Avg. Grams',
				NUMBER_OF_FISH: '# Fish',
				TOTAL_KG: 'Total KG',
				FEED_PLAN: 'Feed Plan',
				GIVEN_FEED: 'Given Feed',
				TOTAL_FOOD: 'Total Food',
				FOOD_TYPE: 'Food Type',
				MORTALITY: 'Mortality',
			},
			SOLD: {
				FEED_DATE: 'Feed Date',
				SOLD_FISH: 'Sold Fish',
				AVERAGE_WEIGHT: 'Average Weight',
				SALE: 'Sale',
				TOTAL_WEIGHT: 'Total Weight',
				FCR: 'FCR',
				TOTAL_GIVEN_FOOD: 'Total Given Food',
			},
			RESULTS: {
				FISH_SCHOOL_UPDATE_SUCCESS: 'Fish schools updated successfully',
			},
			NAME: 'Name',
			QUANTITY: 'Quantity',
			CREATION_DATE: 'Creation Date',
			PERCENTAGE_TSEMACH: 'Percentage Tsemach',
			FOOD_NAME: 'Food Name',
			SPECIE: 'Specie',
		},
		FOOD: {
			FOOD_TYPE: 'Food Type',
			CHOOSE_FOOD_TYPE: 'Choose Food Type',
			TABLE: {
				TITAL: 'Daily Farm Update',
				NAME: 'Name',
				QUANTITY: 'Quantity',
				DAILY_FEED: 'Daily Feed',
				FOOD_TYPE: 'Food Type',
				MORTALITY: 'Mortality',
			},
			FILTERS: {
				CHOOSE_FOOD_NAME: 'Choose food type',
				START_TYPING_NAME: 'Start typing food type',
				FOOD_NAME_NOT_FOUND: 'Food type not found',
			},
			DELETE: {
				CONFIRM_HEADER: 'Confirm Food Deletion',
				ARE_U_SURE: 'Are you sure you want to delete a food?',
				CONFIRM_INFO: 'By choosing \'OK\' you will no longer be able to view it or restore it'
			},
			RESULTS: {
				FOOD_UPDATE_SUCCESS: 'Food updated successfully',
				FOOD_DELETE_SUCCESS: 'Food deleted successfully'
			},
			VALIDATION: {
				NEW_RECORD_INCOMPLETE: 'New Food is incomplete please add missing information: {{missingParts}} '
			},
		},
		DELIVERY_NOTES: {
			UPDATE_WITHOUT_RECORDS: 'Your Delivery note data not yet visible, update cannot be done',
			FILTERS: {
				STATUS: {
					SALE: 'Sale',
					SHIPMENT: 'Shipment'
				},
				FOOD_DATE: 'Food date',
				PANEL: {
					HEADER: 'Delivery Notes Filters',
					DESCRIPTION: 'Choose Delivery Notes'
				},
			},
			TABLE: {
				NAME: 'Food Name',
				STATUS: 'Status',
				QUANTITY: 'Quantity',
				ACTION_TYPE: 'Action Type',
				RECEIPT: 'Receipt #',
				FOOD_DATE: 'Food Date',
			},
			DELETE: {
				CONFIRM_HEADER: 'Confirm Delivery Notes Deletion',
				ARE_U_SURE: 'Are you sure you want to delete a delivery notes?',
				CONFIRM_INFO: 'By choosing \'OK\' you will no longer be able to view it or restore it'
			},
			RESULTS: {
				DELIVERY_NOTES_UPDATE_SUCCESS: 'Delivery Notes updated successfully',
				DELIVERY_NOTES_DELETE_SUCCESS: 'Delivery Note deleted successfully',
			},
			VALIDATION: {
				MANDATORY_DATA_MISSING: 'Please fill all mandatory information: Receipt, Food Date & at least 1 Food Type'
			}
		},
		ACTIONS: {
			SAVE: 'Save',
			UPDATE: 'Update',
			ADD: 'Add new',
			CLOSE: 'Close',
			SEARCH: 'Search',
			OK: 'OK',
			CANCEL: 'Cancel',
		},
		ECOMMERCE: {
			COMMON: {
				SELECTED_RECORDS_COUNT: 'Selected records count: ',
				ALL: 'All',
				SUSPENDED: 'Suspended',
				ACTIVE: 'Active',
				FILTER: 'Filter',
				BY_STATUS: 'by Status',
				BY_TYPE: 'by Type',
				BUSINESS: 'Business',
				INDIVIDUAL: 'Individual',
				SEARCH: 'Search',
				IN_ALL_FIELDS: 'in all fields'
			},
			ECOMMERCE: 'eCommerce',
			CUSTOMERS: {
				CUSTOMERS: 'Customers',
				CUSTOMERS_LIST: 'Customers list',
				NEW_CUSTOMER: 'New Customer',
				DELETE_CUSTOMER_SIMPLE: {
					TITLE: 'Customer Delete',
					DESCRIPTION: 'Are you sure to permanently delete this customer?',
					WAIT_DESCRIPTION: 'Customer is deleting...',
					MESSAGE: 'Customer has been deleted'
				},
				DELETE_CUSTOMER_MULTY: {
					TITLE: 'Customers Delete',
					DESCRIPTION: 'Are you sure to permanently delete selected customers?',
					WAIT_DESCRIPTION: 'Customers are deleting...',
					MESSAGE: 'Selected customers have been deleted'
				},
				UPDATE_STATUS: {
					TITLE: 'Status has been updated for selected customers',
					MESSAGE: 'Selected customers status have successfully been updated'
				},
				EDIT: {
					UPDATE_MESSAGE: 'Customer has been updated',
					ADD_MESSAGE: 'Customer has been created'
				}
			}
		}
	}
};
