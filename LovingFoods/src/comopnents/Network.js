'user strict';
import React,{ Component } from 'react';

export default class Network extends Component {


    static get = (url,params,timeout)=>{

        var abort_promise = new  Promise((resolve,reject) => {

            setTimeout(()=>{
                reject('request timeout');
            },timeout);

        });



        var paramsArray = [];
        Object.keys(params).forEach((key)=>paramsArray.push(key+'='+params[key]));
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&');
        } else {
            url += paramsArray.join('&');
        }

        var fetch_Promise = new Promise((resolve, reject) => {
            fetch(url).then((resp)=> resp.json()).then((json)=> resolve(json)).then((err)=>reject(err));
        })


        return Promise.race([abort_promise,fetch_Promise]);
    }

    static postJson = (url,params,timeout)=>{


            var abort_promise = new  Promise((resolve,reject) => {

                setTimeout(()=>{
                    reject('request timeout');
                },10);

            });


            var fetch_Promise = new Promise((resolve, reject) => {
                fetch(url,{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(params)
                }).then((resp)=>resp.json()).then((json)=> resolve(json)).then((err)=>reject(err));
            })

            return Promise.race([abort_promise,fetch_Promise]);

    }

    static postForm = (url,params,timeout)=>{

            var abort_promise = new  Promise((resolve,reject) => {

                setTimeout(()=>{
                    reject('request timeout');
                },10);

            });


            var paramsArray = [];
            Object.keys(params).forEach((key)=>paramsArray.push(key+'='+params[key]));

            var fetch_Promise = new Promise((resolve, reject) => {
                fetch(url,{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: paramsArray.join('&')
                }).then((resp)=>resp.json()).then((json)=> resolve(json)).then((err)=>reject(err));
            })

            return Promise.race([abort_promise,fetch_Promise]);

    }

}