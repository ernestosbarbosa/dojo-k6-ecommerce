import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class Login {
    #token

    access(user, pass) {
        let response = http.post(`${Utils.getBaseUrl()}/login`, JSON.stringify(
            {
                "username": user,
                "password": pass
            }
        ), {
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        })
        this.#token = response.json('accessToken')
        check(response, {
            "status deve ser 201": (r) => r.status === 201
        });
    }

    getToken(){
        return this.#token
    }
}