import AWS from 'aws-sdk';
import * as express from 'express'
import { Request, Response } from 'express'
import AuthMiddleware from '../middleware/auth.middleware';
require('dotenv').config();

class ProtectedController {

  public path = '/protected'
  public router = express.Router()
  private authMiddleware;

  constructor() {
    this.authMiddleware = new AuthMiddleware();
    this.initRoutes()
  }

  public initRoutes() {
    this.router.use(this.authMiddleware.verifyToken)
    this.router.get('/secret', this.secret)
  }

  secret = (req: Request, res: Response) => {

    console.log('----------------------------------------------------------')


    //LOGIN TO AWS ROOT ACOUNT  BY USER KEY AND SECRET KEY
    // AWS.config.update({
    //   accessKeyId: "",
    //   secretAccessKey: "",
    //   "region": "us-east-1"  
    // }); 




    // SET REGIEN FOR GLOBLE AWS
    console.log('******************************')

    AWS.config.update({
      region: 'us-east-1' // Region
    });

    var idTo= ''      /* required - get this idToken from sign-in function (by AWS)*/
    var acessTo= ''   /* required - get this accessToken from sign-in function (by AWS)*/

    console.log('******************************')

    //LOGIN TO IdentityPollId
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.IdentityPoolId, //'us-east-2:33d2cde0-ea01-4ac3-a612-d42969c1b2b4',
      Logins: {
        "cognito-idp.*region_value*.amazonaws.com/*pool_id_value*" : idTo
      }}, { region: process.env.region}
    );




    //GET THE POLICY VALUE BY ROLE AND POLICY NAME
    console.log('******************************')

    var iam = new AWS.IAM();
    var params = {
      PolicyName: 'my-custom-s3-policy',
      RoleName: 'my_role_s3_web'
    };
    var result :AWS.IAM.GetRolePolicyResponse;
    iam.getRolePolicy(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else { // successful response
          result = data; 
          console.log(data)
          console.log(decodeURI(result.PolicyDocument))
        }; 
    });




    //GET S3 BUCKETS LIST INFO
    console.log('******************************')

    var s3 = new AWS.S3();
    s3.listBuckets(function(err, data) {
      console.log(err, data);
    });




    //GET USRE INFO FROM COGNITO
    console.log('******************************')


    var params1 = {
      AccessToken: acessTo /* required */
    };
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    cognitoidentityserviceprovider.getUser(params1, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });


    console.log('===============================')



     res.send("you can view secret")
    }
  }

export default ProtectedController;