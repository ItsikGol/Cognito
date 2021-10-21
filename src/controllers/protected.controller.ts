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

    var idTo= 'eyJraWQiOiJPTjNVZE9BdGhneFdsZFJvSkd4bDZTVTlsQnVyVkdhdlc4UjhvNHNvWDQwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1OTk1NDg1Yy1iZjUxLTQ5NWItYThiZS0wOWJlNTc1NWJmNDgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYmlydGhkYXRlIjoiMjAwMC0wMS0wMSIsImdlbmRlciI6Im1hbGVlIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfOEtsRlZFVWlSIiwiY29nbml0bzp1c2VybmFtZSI6Iml0c2lrNSIsIm9yaWdpbl9qdGkiOiIzYmNhMjI4My1jZWM3LTRkMTItYTY4ZS1jOTMzZTc3NTc1OWMiLCJhdWQiOiIyb3IzdXE4dmY3ZGVsc3V1cTYyZmRsOG00IiwiZXZlbnRfaWQiOiI3NjZmMTFlOS02OTRmLTQ5NzEtYTg3OS1hMTIzZDY5MzcyODAiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYzNDgzOTExNiwibmFtZSI6Iml0c2lrIGZmMiIsImV4cCI6MTYzNDg0MjcxNiwiaWF0IjoxNjM0ODM5MTE2LCJmYW1pbHlfbmFtZSI6ImV4bXBsZSIsImp0aSI6ImMxYjZhODhiLWI5MDItNDg2OC04MzZjLWI2NDI5MTI5NjFhMiIsImVtYWlsIjoiaXRzaWtnb2xkYmVyZ0BnbWFpbC5jb20ifQ.EOG82BLE4Kv3KkoqgXCTqgUF-axqeanlu6qf3ApAgtOLY1JWZ4w6b2gMspNG5AOSBsfnrYG447cB4m228PzzxbccJcrozp6SxhVelADRIHixYYfHi44riUQBNlpp7ZT3uWnJrp3Y274ILpROFxX0F4m_u1-so-TzwHS7dMRWYuvVNAGbtYiIqRP8dZ63Vi1y0QTe4xgljmrjtyvU7-eKoOJTx-KCS6BzdLVKmkueQU2CigU8lFD2KLJ_Y7x3FupdL8zLKH-TyChiJpFYJ0ECajb1ALvlCPluVWSK-3E43MoS234cqoezg_4tNHvJhNwyTEKtJq3SMpvWmLtNZATkZQ'
    var acessTo= 'eyJraWQiOiJhdStTQnpadEsrR3lHcFczTTkwSVdiOVcrNjBxWWNXZTlpM0V4UFJURGU4PSIsImFsZyI6IlJTMjU2In0.eyJvcmlnaW5fanRpIjoiM2JjYTIyODMtY2VjNy00ZDEyLWE2OGUtYzkzM2U3NzU3NTljIiwic3ViIjoiNTk5NTQ4NWMtYmY1MS00OTViLWE4YmUtMDliZTU3NTViZjQ4IiwiZXZlbnRfaWQiOiI3NjZmMTFlOS02OTRmLTQ5NzEtYTg3OS1hMTIzZDY5MzcyODAiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjM0ODM5MTE2LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV84S2xGVkVVaVIiLCJleHAiOjE2MzQ4NDI3MTYsImlhdCI6MTYzNDgzOTExNiwianRpIjoiNjU4ZGEwNWYtNGNmZC00YzdlLWE0ZGEtM2U4Mzk5YTE2ZGY5IiwiY2xpZW50X2lkIjoiMm9yM3VxOHZmN2RlbHN1dXE2MmZkbDhtNCIsInVzZXJuYW1lIjoiaXRzaWs1In0.g03U0wzVU3YQ_cOZSZKRQcQL0lniuotCFXsinUQBuDVnURfCJMGVTpJ7ZcXA9Ga9aNoB3xwhcNvwl4acTwxQMaHZ2_sf3Fb-5gs76Pf1rg9dRa0-qwWI7gr2zI0Q8lFQI8obtAwxQdD4E0kjfY-DUUP3DuQeJdCE_GZVykiCvQZQTpp8TJ5S4NtaDm60MknHNygWcJRv57Y1nF7VE0bbPdwMMkhE2kcFnkChBJtGFrxk2NNqtWMXhXGg3U4HATV4Xl6JPS0D0Z_0BohIkcViQlBLikHE5j5EvsbT8u0efDngQ-80zbI-Pes-L0c1GRWwOdEuAtmPeDobaJFyHV2PfQ'

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