import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "@models/user.model";
import {checkToken} from "@interceptors/token.interceptor";
import {Board} from "@models/board.model";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  getBoard(id : Board['id']) {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/me/boards/${id}`, {
      context: checkToken()
    })
  }

}
