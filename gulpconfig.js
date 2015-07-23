module.exports = {
	client:{
		browserify:{
			src:[
				'./src/client/javascript/authentication.js',
				'./src/client/javascript/config.js',
				'./src/client/javascript/markers-page.js',
				'./src/client/javascript/pgx.js',
				'./src/client/javascript/phase-page.js',
				'./src/client/javascript/dosing-page.js',
				'./src/client/javascript/status-page.js',
				'./src/client/javascript/projects.js',
				'./src/client/javascript/patients.js'
			],
			dest:'build/public/js'
		},
		uploader : {
			src:'./src/client/javascript/uploader.js',
			name:'uploader.js',
			min:'upload.min.js',
			dest:'build/public/js',
			vendor:[
				"bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js",
				"bower_components/blueimp-file-upload/js/jquery.iframe-transport.js",
				"bower_components/blueimp-file-upload/js/jquery.fileupload.js"
			],
			vendorName:'upload.vendor.min.js',
			vendorDest:'build/public/js/vendor'
		},
		vendorBundle:{
			src:[
				//'src/client/javascript/vendor.js'
				'bower_components/jquery/dist/jquery.min.js',
				'bower_components/modernizr/modernizr.js',
				'bower_components/foundation/js/foundation.min.js'
			],
			name:'vendor.bundle.min.js',
			dest:'build/public/js/vendor'
		},
		templates:{
			src:'./src/client/javascript/templates.js',
			name:'templates.js',
			dest:'build/public/js'
		},
		modernizr:{
			src:'bower_components/modernizr/modernizr.js',
			dest:'build/public/js/vendor'
		},
		views:{
			src:[
				'src/client/templates/layout.hbs',
				'src/client/templates/default-pgx-report.hbs',
				'src/client/templates/default-dosing-report.hbs'
				],
			dest:'build/views'
		},
		css:{
			src:[
				'src/client/css/app.css',
				'bower_components/foundation/css/foundation.min.css'
				],
			dest:'build/public/css'
		},
		reportCss:{
			src:'src/client/css/pgx-report.css',
			dest:'build/public/css'
		},
		img:{
			src:'src/client/images/**/*.*',
			dest:'build/public/img'
		},
		icon:{
			src:[
				'src/client/icons/**/*.*',
				'bower_components/foundation-icon-fonts/**/*.*'
				],
			dest:'build/public/icons'
		},
	},
	server:{
		app:{
			src:'src/server/src/server.js',
			name:'webapp.js',
			dest:'build'
		},
		bulkops:{
			src:'src/server/src/bulkops.js',
			dest:'build'
		},
		routes:{
			src:'src/server/routes/*.js',
			dest:'build/controllers'
		},
		lib:{
			src:[
				'src/server/src/anno_logger.js',
				'src/server/src/annotateAndAddVariants.js',
				'src/server/src/logger.js',
				'src/server/src/parseVCF.js',
				'src/server/src/queue.js',
				'src/server/src/utils.js',
				'src/server/src/genReport.js',
				'src/server/src/getDbSnp.js'
			],
			dest:'build/lib'
		},
		conf:{
			src:[
				'src/server/conf/api.js',
				'src/server/conf/pgx*',
				'src/server/conf/default_rec_data.json'
			],
			dest:'build/lib/conf'
		},
		cons:{
			src:'src/server/conf/constants.json',
			dest:'build/lib/conf'
		},
		model:{
			src:'src/server/src/mongodb_functions.js',
			dest:'build/models'
		}
	},
	jshint:[
		'src/server/**/*.js',
		'src/client/javascript/*.js',
		'src/client/config/*.json'
	]
};