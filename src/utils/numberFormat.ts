export const NumberFormat = ({locales, number, currency, style,maximumFractionDigits,notation }:any) => {
    let nf;
    if(currency){
        nf = new Intl.NumberFormat(locales || "en-US", {
            style: style || "currency",
            currency: currency || "USD",
            maximumFractionDigits:maximumFractionDigits || 0,
            notation: notation || "standard",
          });
    }else{
        nf = new Intl.NumberFormat(locales || "en-US", {
            maximumFractionDigits:maximumFractionDigits || 0,
            notation: notation || "standard",
          });
    }
    return number? nf.format(number || 0):"";
  };