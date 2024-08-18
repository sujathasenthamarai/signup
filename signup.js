

const getError = (errors, prop) => {
	try {
		return errors.mapped()[prop].msg;
	} catch (error) {
		return "";
	}
};

module.exports = ({ errors }) => {
	return `
	<!DOCTYPE html>
	<html>
		<head>
		<link rel='stylesheet'
href='https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma.min.css'>
		<style>
		div.container{
		background-color:rgb(47, 213, 141);
        width: 500px;
        border-radius: 10px;
		}
			div.columns {
			 font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
			margin-top: 100px;
			}
			button {
			 font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
			margin-top: 10px;
            margin-left: 3vw;
            width: 100px;
            height: 50px;
            border-radius: 5px;
            font-size: 1.2rem;
            background-color: blueviolet;
            color:white;
			}
            h1{
           text-align: center;
            font-size: 2rem;    
            font-weight: bold;
            color: antiquewhite;
            margin-bottom: 10px;
            text-shadow: 2px 2px 2px black;
            }
			  .danger{
               color: blueviolet;;
            }
		</style>
		</head>
		<body>
		<div class='container'>
			<div class='columns is-centered'>
			<div class='column is-5'>
				<h1 >Signup Form</h1>
				<form method='POST'>			 
				<div>
					<div>
					<label class='label' id='email'>
						Username/Email</label>
					</div>
					<input class='input' type='text'
						name='email'
						placeholder='Email' for='email'>
				</div>
				<div>
					<div>
					<label class='label' id='password'>
						Password</label>
					</div>
					<input class='input' type='password'
						name='password'
						placeholder='Password' for='password'>
				</div>
				<div>
					<div>
					<label class='label' id='confirmPassword'>
						Confirm Password</label>
					</div>
					<input class='input' type='password'
						name='confirmPassword'
						placeholder='Confirm Password'
						for='confirmPassword'>
					<p class="danger">
					${getError(errors, "confirmPassword")}
					</p>
				</div>
				<div>
					<button >
					Sign Up
					</button>
				</div>
				</form>
			</div>
			</div>
		</div>
		</body>
	</html> 
	`;
};
