import { Pipe,PipeTransform } from "@angular/core";

@Pipe({
    name:"ValidationDate"
})
export class ValidationDate implements PipeTransform{
    transform(data: any, text: string) {
        let transform;
        if(data == null){
            transform = text;
        }else{
            transform = data;
        }
        return transform;
    }
}