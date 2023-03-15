//models/dm.model.js

require('dotenv/config')
//import connection
const sql = require('./db.js');

console.log('connection imported')
//create tables//

//User table: contains user details
exports.createUsertb = (result) => {
	sql.run("create table  if not exists usertb(email varchar(64) primary key,\
     password varchar(64) not null, phone varchar(16) unique,\
	 username varchar(64) unique, profile_picture varchar(64), \
	 email_verified boolean default(false))", result);
};

//Interest table: contains interests of users
exports.createInteresttb = (result) => {
	sql.run("create table if not exists interesttb(interest_id Integer primary key,\
	interest varchar(64), email varchar(64), foreign key(email) references usertb \
	(email) on delete cascade on update cascade)", result);
};

//email verification table: contains email verification hash of users
exports.createEmailHashtb = (result) => {
	sql.run("create table if not exists emailHashtb(hash varchar(100) ,\
	email varchar(64) primary key)", result);
};


//create triggers//

//query database//

//get stored password hash of user: for authentication 
exports.getPasswordHash = (user, result) => {
	sql.all("select password,username, email_verified from usertb where email=? or phone=?",
		[user, user], result);
};

//save personal data of user
exports.savePersonalData = (username, email, password,
	phone, result) => {
	sql.run("insert into usertb(username, email,password,\
	phone) values(?,?,?,?)", [username, email, password,
		phone], result);
};

//Query usertb for data
exports.validate = (column, value, result) => {
	sql.all(`select * from usertb where ${column}=?`, [value], result);
};

//add new inventory
exports.register = (username, email, password, phone, interestList, result) => {
	let finalQuery = "insert into interesttb (interest, email) values ";

	const finalInterestList = [];

	console.log('password ', password, 'phone ', phone);

	//first save personal data
	sql.run("insert into usertb(username, email,password,\
		phone) values(?,?,?,?)", [username, email, password, phone],
		(!interestList.length) ? result : function (err) {
			if (err) result(err); //if error occured while saving personal data, abort all operation
			else {
				//since no error, proceed to save user's interests.

				//query has to be of the form: 
				//"insert into interesttb (interest, email,phone) values (?,?,?),(?,?,?),..."
				//The number of (?,?,?) in the query depends on the length of the interest array
				finalQuery = finalQuery + ('(?,?),'.repeat(interestList.length)) + ';'
				finalQuery = finalQuery.replace(',;', ';');
				console.log(finalQuery);

				//Arrange the parameters in the order they should be used
				interestList = interestList.map((item, indx) => {
					//	finalQuery += `(?,?,?) ${(indx + 1 < interestList.length) ? ',' : ''}`;
					//finalInterestList.push(...[item, email, phone]);
					finalInterestList.push(...[item, email])
					return [item, email];
				});

				console.log(interestList, finalInterestList);
				sql.run(finalQuery, finalInterestList, result); //
			}
		});

};

exports.findLikeMinds = (user, result) => {
	console.log('findLikeMinds')
	sql.all("select u.profile_picture, u.username, i.interest from \
	interesttb as i inner join usertb as u on i.email=u.email \
	where i.interest in (select interest from interesttb where email in \
	(select email from usertb where email=? or phone=?))\
	and u.email <> ? and u.phone<>?",
		[user, user, user, user], result);
};

//get user's username and email verification status
exports.getUserIdentity = (userId, result) => {
	sql.all("select username,email_verified as emailVerified from usertb where\
	email=? or phone=?", [userId, userId], result);
};

//save interests of user
exports.saveInterests = (interestList, email, phone, result) => {
	sql.run("insert into interesttb(interest), email,password,\
	phone) values(?,?,?,?)", [username, email, password,
		phone], result);
};


//Save the hash send to a user's email
exports.saveEmailVerificationHash = (hash, email, result) => {
	sql.run("insert or replace into emailHashtb (hash,email) values (?,?)",
		[hash, email], result);
};

//Save the hash send to a user's email
exports.verifyEmail = (hash, result) => {
	sql.run("delete from emailHashtb where hash=?",
		[hash], result);
};

//Set email verified to true
exports.updateEmailVerified = (hash, result) => {
	sql.run("update usertb set email_verified=true where email in \
	(select email from emailHashtb where hash=?)",
		[hash], result);
};

//change password
exports.changePassword = (newPassword, email, result) => {
	sql.run("update usertb set password=? where email=?",
		[newPassword, email], result);
};

//update password of already logged in user
exports.updatePassword = (newPassword, user, result) => {
	sql.run("update usertb set password=? where email=? or phone=?",
		[newPassword, user, user], result);
};

//get email of this user for editing
exports.getEmail = (user, result) => {
	sql.all("select  email from usertb where email=? or phone=?",
		[user, user], result);
};

//get username of this user for editing
exports.getUsername = (user, result) => {
	sql.all("select username from usertb where email=? or phone=?",
		[user, user], result);
};

//update email of this user 
exports.updateEmail = (newEmail, user, result) => {
	console.log(newEmail, user)
	sql.all("update usertb set email=? where email=? or phone=?",
		[newEmail, user, user], result);
};

//update username of this user  
exports.updateUsername = (newUsername, user, result) => {
	sql.all("update usertb set username=? where email=? or phone=?",
		[newUsername, user, user], result);
};


//get details of this user
exports.getProfileData = (user, result) => {
	sql.all("select email, phone,username, profile_picture \
	 from usertb where email=? or phone=?", [user, user], result);
};

//get interests of this user
exports.getInterests = (user, result) => {
	sql.all("select interest from interesttb where email in \
	(select email from usertb where \
	email=? or phone=?)", [user, user], result);
};

//get profile details of user
exports.getProfile = (email, result) => {
	sql.all("select  phone, first_name firstName, last_name lastName, is_seller isSeller,\
	gender, picture from usertb where email=?", [email], result);
};
