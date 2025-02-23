 export function convertNumberToWords (number){

    var NS = [
        {value: 1000000000000000000000, str: "sextillion"},
        {value: 1000000000000000000, str: "quintillion"},
        {value: 1000000000000000, str: "quadrillion"},
        {value: 1000000000000, str: "trillion"},
        {value: 1000000000, str: "billion"},
        {value: 1000000, str: "Million"},
        {value: 1000, str: "Thousand"},
        {value: 100, str: "Hundred"},
        {value: 90, str: "Ninety"},
        {value: 80, str: "Eighty"},
        {value: 70, str: "Seventy"},
        {value: 60, str: "Sixty"},
        {value: 50, str: "Fifty"},
        {value: 40, str: "Forty"},
        {value: 30, str: "Thirty"},
        {value: 20, str: "Twenty"},
        {value: 19, str: "Nineteen"},
        {value: 18, str: "Eighteen"},
        {value: 17, str: "Seventeen"},
        {value: 16, str: "Sixteen"},
        {value: 15, str: "Fifteen"},
        {value: 14, str: "Fourteen"},
        {value: 13, str: "Thirteen"},
        {value: 12, str: "Twelve"},
        {value: 11, str: "Eleven"},
        {value: 10, str: "Ten"},
        {value: 9, str: "Nine"},
        {value: 8, str: "Eight"},
        {value: 7, str: "Seven"},
        {value: 6, str: "Six"},
        {value: 5, str: "Five"},
        {value: 4, str: "Four"},
        {value: 3, str: "Three"},
        {value: 2, str: "Two"},
        {value: 1, str: "0ne"}
      ];
    
      var result = '';
      for (var n of NS) {
        if(number>=n.value){
          if(number<=20){
            result += n.str;
            number -= n.value;
            if(number>0) result += ' ';
          }else{
            var t =  Math.floor(number / n.value);
            var d = number % n.value;
            if(d>0){
              return convertNumberToWords (t) + ' ' + n.str +' ' + convertNumberToWords (d);
            }else{
              return convertNumberToWords (t) + ' ' + n.str;
            }
    
          }
        }
      }
      return result;
    }