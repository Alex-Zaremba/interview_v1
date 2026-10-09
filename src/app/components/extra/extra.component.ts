import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { catchError, mergeMap, Observable, of, throwError, timer } from "rxjs";
import "zone.js";

@Component({
  selector: "app-extra",
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  template: ` <input type="text" formControlName="formControl" /> `,
})
export class ExtraComponent implements OnInit {
  formControl: FormControl<string> = new FormControl("", { nonNullable: true });

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(
        mergeMap((value) => this.request(value)),
        catchError((e) => {
          console.error(e);
          return of("nothing happened");
        }),
        takeUntilDestroyed(),
      )
      .subscribe((response) => console.log(response));
  }

  // Весь код ниже - оставить без изменений
  // Имитация запроса в endpoint
  request(param: string): Observable<SimpleResponse> {
    return timer(this.generateRandomDelay()).pipe(
      mergeMap(() =>
        param.includes("test")
          ? of({ data: "success" })
          : throwError(() => new Error("Pretending server error response")),
      ),
    );
  }

  generateRandomDelay(): number {
    return Math.random() * 2000;
  }
}

interface SimpleResponse {
  data: string;
}

/**
 * Имеется компонент в котором есть инпут, при изменении которого ходим в эндпоинт и получаем какие то данные.
 *
 * Нужно провести ревью, исправить проблемные места, улучшить компонент, убрать всё лишнее.
 *  После метода ngOnInit() есть комментарий - "Весь код ниже - оставить без изменений" -
 * т.е. исправлять только код выше этого комментария, допуская,
 * что метод request() делает http GET запрос и возвращает Observable<SimpleResponse>
 *
 * Основная проблема - не работает контрол.
 * Когда он заработает - откроется другая проблема: при вводе значений в инпут имитируется отправка запроса на поиск по этому вводу.
 *  Если ввести строку, содержащую 'test' - будет имитирован возврат обычного успешного респонса ({ data: 'success' }),
 *  если поисковой запрос перестанет содержать строку 'test' - вернется ошибка со строкой 'Pretending server error response', и последующие вводы больше не будут отправлять новые запросы. Нужно исправить данное поведение, чтобы последующий корректный ввод (строка, содержащая 'test') вновь отправлял поисковой запрос и возвращал { data: 'success' }.
 */
