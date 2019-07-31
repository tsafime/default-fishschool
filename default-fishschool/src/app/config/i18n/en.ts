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
			AUTHORIZATION: 'Authorization',
			FISH_SCHOOLS: 'Fish schools',
			FISH_SCHOOLS_NEW: 'New',
			FISH_SCHOOLS_TOGGLE_STATUS: 'Toggle Status',
			VIEW_SOLD_FISH_SCHOOL: 'View Sold',
			SALE_FISH_SCHOOL: 'Sale',
			FARM: 'Farm',
			FOOD_NAMES: 'Food Names',
			DELIVERY_NOTES: 'Delivery Notes',
		},
		TOP_BAR: {
			LOGOUT: 'Logout',
			HELLO: 'Hello ',
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
			ACTUAL_GIVEN_FOOD: 'Total Food',
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
			LOAD_AUTHORIZATIONS_FAILURE: 'Unable to load authroizations records, please try again later',
			FISH_SCHOOL_MULTI_UPDATE: 'You may update only 1 day at the time',
		},
		FARM: {
			ACTUAL_GIVEN_FOOD: 'Actual Given Food',
			MORTALITY: 'Mortality',
			SOLD: 'Sold',
			ACTIVE: 'Active',
		},
		FISH_SCHOOL: {
			UPDATE_WITHOUT_RECORDS: 'Your Fish school data not yet visible, update cannot be done',
			NEW_FISH_SCHOOL: 'New Fish School',
			RENAME_FISH_SCHOOL: 'Rename School',
			SOLD_ACTIVE_FISH_SCHOOL: 'Sold/Active School',
			FILTERS: {
				SCHOOL_NAME: 'School name',
				SELECT_SCHOOL_NAME: 'Select School name',
				SELECT_FROM_SCHOOL_NAME: 'Select From School name',
				SELECT_TO_SCHOOL_NAME: 'Select To School name',
				SOLD_SCHOOL_NAME: 'Sold School name',
				CHOOSE_SCHOOL_NAME: 'Choose School Name',
				START_TYPING_NAME: 'Start typing name',
				SCHOOL_NAME_NOT_FOUND: 'School name not found',
				SCHOOL_NAME_NOT_SELECTED: 'Not selected',
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
					VIEW_SOLD_HEADER: 'View Sold Fish school filters',
					SOLD_HEADER: 'Sold Fish school filters',
					SOLD_FROM: 'Sold From',
					SOLD_TO: 'Move To',
				}
			},
			TABLE: {
				SELECTED_DATE: 'Selected Date',
				AGE: 'Age',
				MANUAL_WEIGHT: 'M Weight',
				AVERAGE_GRAMS: 'Avg. Grams',
				NUMBER_OF_FISH: '# Fish',
				TOTAL_KG: 'Total KG',
				FEED_PLAN: 'Feed Plan',
				GIVEN_FEED: 'Given Feed',
				TOTAL_FOOD: 'Total Food',
				FOOD_TYPE: 'Food Type',
				MORTALITY: 'Mortality',
				FCR: 'FCR',
				SOLD: 'Sold',
				SOLD_WEIGHT: 'Avg. Sold',
			},
			VIEW_SOLD: {
				FEED_DATE: 'Feed Date',
				VIEW_SOLD_FISH: 'View Sold Fish',
				AVERAGE_WEIGHT: 'Average Weight',
				SALE: 'Sale',
				TOTAL_SALE: 'Total Sale',
				TOTAL_WEIGHT: 'Total Weight',
				FCR: 'FCR',
				TOTAL_GIVEN_FOOD: 'Total Given Food',
			},
			SOLD: {
				FEED_DATE: 'Feed Date',
				SOLD_FISH: 'Sold Fish',
				SALE_AVG_WEIGHT: 'Sale Avg Weight',
				SALE_TO_MOVED_QUANTITY: 'Moved Quantity',
				SALE_TO_MOVED_AVG_WEIGHT: 'Moved Avg Weight',
				ADD_NEW_TITLE: 'Add new "sold to" school',
				DELETE_LAST_TITLE: 'Delete last "sold to" school',
			},
			RESULTS: {
				FISH_SCHOOL_UPDATE_SUCCESS: 'Fish schools updated successfully',
				SOLD_FISH_SCHOOL_UPDATE_SUCCESS: 'Sold Fish schools have been updated successfully',
			},
			VALIDATION: {
				SOLD_DUPLICATE_SCHOOL_NAME: 'You have selected same school name: {{name}} in both "Sold From" and "Move To"',
				SOLD_DUPLICATE_SOLD_TO_SCHOOL_NAME: 'You have selected same school name: {{name}} in "Move To"',
			},
			NAME: 'Name',
			QUANTITY: 'Quantity',
			CREATION_DATE: 'Creation Date',
			PERCENTAGE_TSEMACH: 'Percentage Tsemach',
			FOOD_NAME: 'Food Name',
			SPECIE: 'Specie',
			AVERAGE_WEIGHT: 'Average Weight',
		},
		AUTHORIZATIONS: {
			NAME: 'Name',
			ACTION: 'Action',
			COMPANY: 'Company',
			USER: 'User',
			FISH_SCHOOL: 'FishSchool',
			FOOD: 'Food',
			FOOD_INVOICE: 'FoodInvoice',
			FOOD_INVOICE_SLOT: 'FoodInvoiceSlot',
			ACTION_VIEW: 'View',
			ACTION_SAVE: 'Save',
			ACTION_UPDATE: 'Update',
			ACTION_DELETE: 'Delete',
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
		TOGGLE_STATUS: {
			TOGGLE_ACTIVE: 'Toggle Active',
			TOGGLE_SOLD: 'Toggle Sold',
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
