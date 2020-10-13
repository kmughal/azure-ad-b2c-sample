# Introduction

This is a sample code of how to setup Azure ad b2c using WebApi.


## Steps to perform

### Register a new application and setup permissions

- Go to Azure portal
- Search for Azure Ad b2c
- Register new application and save it
- Once register open the application and click on the Overview tab.
- Write down the ClientId,Directory/TenantId
- Click on Authentication tab and provide a url where the token will be returned and from the implicit grant section select ID token.
- Now click on Expose an Api in the application Id Uri click on the edit button to alter it so that (https://<<tenant_name>>/api)
- Then add a scope and save it.
- Create a user secret


### How to get access token

In order to get the access token send a request to the following url.

```sh
https://login.microsoftonline.com/<tenant_name>/oauth2/v2.0/authorize?response_type=code&client_id=<client_id>&redirect_uri=http://localhost:3000&scope=openid
```

You can open a browser and navigate to that page. You will notice an error while visiting that page but in the addressbar you will see the url will be changed to include the code and session state.

```sh
http://localhost:3000/?code=0.ATkAxnP4inyBHU6BVFtjbEjZEtrFu5rqoYhDmtfktgxgfgQ5ABQ.AQABAAIAAAB2UyzwtQEKR7-rWbgdcBZIo0yxY5uuo4ZYbQBDIdWjR8C2bmGbEdKbyfk8-rwH2rdvTyg5YmmSBVaGKN2DX88z0kugmOc56_poXau8-HV9Cp6A-p6XFhOUDnMLMeStGJjav_trRpkL0UYLjQJGsMOWssxBi407r6qx1UwnlxamVfuXwlo9MiuMDui3Pc3xQh_cN0eOQQBgnLxXh2rLi1A-NyoIX6C-KC4XkzxoGNZEzCi6lVIaevYbGpCH-WN6eGcrWCfsWZByHxSSfeovn1vbmXzxJ73B6s4qqB92WFdGLIo_uPDwqleQ9ScoleGJBTqd4FGbxaMIjUDI9EPDRNGlMpuoYv6t2-Z-JamOlLPbi6EprGnbgQzB2NY4lp-Nh0bPwmSBboQCph3NpIKXRBBUG9zcNfF6gCIO2bCcn4GciVyaubFq0xoaZzZ-GwqAbsdWZp-_7YxkTRjAPhrcvquAtrDu3ux3cjndzi_m_pfKQFmqdTkIihErfmMjDS-ob405ABtSEjvDKgoKVPoRm7amUhJ61KReSeD4bjW-HmjNtSHLmKX748QuYzpa3FYxRrPdVejrwV1mHdWykJofTVS6LUiiQZpQUMUundcUxxnMIkNh1o5fwwXBAQzWFD09EkkUzl2hGp2OE_88nBX9Cdo5I5sraxJtlHU3gXWM1MXP0QBCPyvQnJCdFKmv7KE2_r-57tweMqy8LeVDk8jRoCw5oXSfgzkhYNdqolSsFwrfzhfeSJ5lsqtMeWirSSMjZQJBOuhAm_Ics5u2IZrtKl05aRyDYHsQLCf3ntL3v6vqO1bUV_M-gteUF3b0JI_t4Itdt6nE0jVdY0MXolSkRAJ5T5jkn0ypNDwigZHzxAa-Y7OtSGWBrvTN5E5Tlet8TZVr_q9uFylMWkhFK2aNzRxohmN_1J5iSUMAaw2eDYrc3hHfD4ROXYoQ__cmJRT92fQpcK-UEOvZ2P3aliUlrFbS-0pQnU9fKjHfAjbZvMT-uW5sIfZkUvIdVP-9TDpwtNP3VIykDfewR_kQ-QGUvL1dOkpaWue1Lkda8Y2Haw416XocEtDs1Lc9oazpjOTUk7zh4G7Iw4bQWzBdHMJrmw_xt_h3x9AYs0ei4s4CiwSXZ4fGd9rs4RZKwynrE108Al1uRNQ8311F7IQHwWfs8Gxiqr62mP0DTyvGZd9tPSRTA_610s_tGxRr1FK1v8iZGlYgAA&session_state=3b14f10c-d5b4-43f4-b478-4a529815b9c6

```

Write down the code part and get ride of everything else.

Now you can use postman to send a request to get the token!

You can again use postman to get that token or you can send a web request using axios or any other framework.


```js
const url = "https://login.microsoftonline.com/<tanent_id>/oauth2/v2.0/token";
const request_type = "post";
const body = {
  redirect_uri : "http://localhost:3000",
  client_id : "<client_id>",
  grant_type: "authorization_code",
  code : "<which you receive from previous step>",
  scope : "<go to the api expose section and select the scope you will see the full url!>",
  client_secret : "go to secret and add screte in azure portal and paste the hash code here"
};


// response

var response = {
    "token_type": "Bearer",
    "scope": "https://khurramshahzadhotmailco.onmicrosoft.com/api/demo.read",
    "expires_in": 3599,
    "ext_expires_in": 3599,
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL2todXJyYW1zaGFoemFkaG90bWFpbGNvLm9ubWljcm9zb2Z0LmNvbS9hcGkiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84YWY4NzNjNi04MTdjLTRlMWQtODE1NC01YjYzNmM0OGQ5MTIvIiwiaWF0IjoxNjAyNDE4Njg3LCJuYmYiOjE2MDI0MTg2ODcsImV4cCI6MTYwMjQyMjU4NywiYWNyIjoiMSIsImFpbyI6IkFXUUFtLzhSQUFBQXJLUmpBQi8vY05DOTNGbExwWWEzeEJ6MnhrVVVJSkFPVElqMVJpMUxMRGVTZ09mRnJGZi9TMTNxR2lFdHkreWRSRlhLbXJNY2R0WlhESmQxczAyVFFrVWJNUDJwOVEvWXJlUEF5cExTVHZnYzltOHRlcUV0VUtncktKbHFIYnQ1IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjlhYmJjNWRhLWExZWEtNDM4OC05YWQ3LWU0YjYwYzYwN2UwNCIsImFwcGlkYWNyIjoiMSIsImVtYWlsIjoia2h1cnJhbXNoYWh6YWRAaG90bWFpbC5jby51ayIsImZhbWlseV9uYW1lIjoiU2hhaHphZCIsImdpdmVuX25hbWUiOiJLaHVycmFtIiwiaWRwIjoibGl2ZS5jb20iLCJpcGFkZHIiOiI4Ni4xNDYuODUuMTM0IiwibmFtZSI6IktodXJyYW0gU2hhaHphZCIsIm9pZCI6ImE5MDg5MThmLWQ3MzctNDRiYi1iYzI3LWM2NWUzNGFkMTJiNyIsInJoIjoiMC5BVGtBeG5QNGlueUJIVTZCVkZ0amJFalpFdHJGdTVycW9ZaERtdGZrdGd4Z2ZnUTVBQlEuIiwic2NwIjoiZGVtby5yZWFkIiwic3ViIjoiUFFta1Bqdkd2YXdMQkdaTHJnbS1GQnNyZ1dVSG9TcnVOaHZlNW1Ta1cyNCIsInRpZCI6IjhhZjg3M2M2LTgxN2MtNGUxZC04MTU0LTViNjM2YzQ4ZDkxMiIsInVuaXF1ZV9uYW1lIjoibGl2ZS5jb20ja2h1cnJhbXNoYWh6YWRAaG90bWFpbC5jby51ayIsInV0aSI6IlNPemsyc21NMlV5N3hONUQ5THNRQUEiLCJ2ZXIiOiIxLjAifQ.UxBpaWZBmDTOPnBrPm6i7HisOy0bObAVdMQoUmlJGm69-BaQVvVjur2G8LMaLbL-F20zou1hHyqgxC0bIQZj4HCxrm5TO1PCmvJs55BJO5hu-61VedXxmLcI1cSeWaixKzQ1K0pFYCGHgferuHlEjtcNERl6mirZhEGj9Z9FQKYBhvREwJED8xK55X_HyXQBE3VPRIDF70C_9hsYth9ccW6yZlYR5Uz_TUL1UhRBKFmnCsqa_S1eTo3pz8sTiGlD9hZPNkP2NiIAzrZ8_sn8XuWb0VNmywaRUg2G6oUv5M9qfGW1nvl-I4KAYIV7YCiSzc2bgHRr61oeqpiWF7cf5Q",
    "id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiI5YWJiYzVkYS1hMWVhLTQzODgtOWFkNy1lNGI2MGM2MDdlMDQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOGFmODczYzYtODE3Yy00ZTFkLTgxNTQtNWI2MzZjNDhkOTEyL3YyLjAiLCJpYXQiOjE2MDI0MTg2ODcsIm5iZiI6MTYwMjQxODY4NywiZXhwIjoxNjAyNDIyNTg3LCJhaW8iOiJBV1FBbS84UkFBQUFpV2JqdFNPNVErVExLSFlET1JTSEh6YjRER2pUL0NxeXFva1ViVDBWVWJpS1NkV2N4K09Lc3JKaFI1TWhlQUk0TmhjOXQ4OXlGeHVITWJ5Y1Myd1RuSzlDVlBGZ0RxYi8xd2d1dUs0UkM0a1JUUTRSa3ljcHBTeUQwdUFRQlJIaSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZC8iLCJyaCI6IjAuQVRrQXhuUDRpbnlCSFU2QlZGdGpiRWpaRXRyRnU1cnFvWWhEbXRma3RneGdmZ1E1QUJRLiIsInN1YiI6IlBRbWtQanZHdmF3TEJHWkxyZ20tRkJzcmdXVUhvU3J1Tmh2ZTVtU2tXMjQiLCJ0aWQiOiI4YWY4NzNjNi04MTdjLTRlMWQtODE1NC01YjYzNmM0OGQ5MTIiLCJ1dGkiOiJTT3prMnNtTTJVeTd4TjVEOUxzUUFBIiwidmVyIjoiMi4wIn0.dhSoVXfeJybKK-VsALepc3-5KKGfBlr3EFdBcATAEEn1NMk3TicUidOI815AhYHMm9EL-fN346cZWF9TGpmQB236UgqGI9fpPg8vOyhlv2KmhRL-5tDD801bERjVnmqWv6mUGUzim75IgHyD5KtITaDF-ZXHxiqwJZ4ufj60wPUJQWk1-ZO9yjgyBQuuFh9KJ7eUbBKep4fabDSE1yydLrL4Pjq3ipPdEtCKDzE_0L1-_hg-QV1OKNecRzQ0X8ubgjP0RU22G4EScTBsRppqjbJImHj_K_7mxLt8mYStXAAS_YwBN0ZzlzCO4MxNN1yu6mi2VAJor9rgQ4Xf1_eZjg"
};

```

You can go to jwt.ms and inspect access_token and id_token


## Get user details

Now you have the access_token you can run 

```js

yarn start

```

This will kick of the node server and you can post a request to the following end point to get user information out from azure ad.

Open postman 

```

### .Net Core MVC

For dontet you can simple create a mvc project using following command:

```sh

 dotnet new mvc --auth SingleOrg --client-id <<client_id>> --tenant-id <<tenant-id>> --domain <<domain-name>>
 
 ```

Once done then you can do dotnet run!
 
