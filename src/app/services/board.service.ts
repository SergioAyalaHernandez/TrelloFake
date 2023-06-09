import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "@models/user.model";
import {checkToken} from "@interceptors/token.interceptor";
import {Board} from "@models/board.model";
import {Card} from "@models/Card.model";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  apiUrl = environment.API_URL;
  bufferSpace = 65535;

  constructor(private http: HttpClient) {
  }

  getBoard(id: Board['id']) {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/me/boards/${id}`, {
      context: checkToken()
    })
  }

  getPosition(cards: Card[], currentIndex: number) {
    if (cards.length === 1) {
      //'is new';
      return this.bufferSpace;
    }
    if (cards.length > 1 && currentIndex === 0) {
      const onTopPosition = cards[1].position;
      return onTopPosition / 2;
      //'is the top';
    }
    const lastIndex = cards.length - 1;

    if (cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex) {
      // 'is the middle';
      const prevPosition = cards[currentIndex - 1].position;
      const nextPosition = cards[currentIndex + 1].position;
      return (prevPosition + nextPosition) / 2;
    }
    if (cards.length > 1 && currentIndex === lastIndex) {
      // 'is the bottom';
      const onBottomPosition = cards[lastIndex - 1].position;
      return onBottomPosition + this.bufferSpace;
    }
    return 0;
    console.log(cards, currentIndex);
  }

}
