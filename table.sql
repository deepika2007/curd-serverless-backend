CREATE TABLE public.users (
	user_id uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	phone_number varchar(20) NULL,
	user_type public."user_role" NOT NULL,
	google_id varchar(255) NULL,
	facebook_id varchar(255) NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_facebook_id_key UNIQUE (facebook_id),
	CONSTRAINT users_google_id_key UNIQUE (google_id),
	CONSTRAINT users_pkey PRIMARY KEY (user_id)
);