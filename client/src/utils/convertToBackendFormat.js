// client/src/utils/convertToBackendFormat.js

export const convertToYieldInput = (inputText) => {
  const obj = {};

  inputText.split(",").forEach((item) => {
    const [key, value] = item.split(":").map((i) => i.trim());
    switch (key.toLowerCase()) {
      case "crop":
        obj.Crop = value;
        break;
      case "state":
        obj.State = value;
        break;
      case "year":
        obj.Year = parseInt(value);
        break;
      case "n":
        obj.N = parseFloat(value);
        break;
      case "p":
        obj.P = parseFloat(value);
        break;
      case "k":
        obj.K = parseFloat(value);
        break;
      case "ph":
        obj.pH = parseFloat(value);
        break;
      case "soil":
      case "soil_type":
        obj.soil_type = value;
        break;
      case "rainfall":
        obj.Rainfall = parseFloat(value);
        break;
      case "temp":
      case "temperature":
        obj.Temp = parseFloat(value);
        break;
      case "humidity":
        obj.Humidity = parseFloat(value);
        break;
      case "fertilizer":
        obj.Fertilizer_Type = value;
        break;
      case "fertilizer_amount":
        obj.Fertilizer_Amount = parseFloat(value);
        break;
      case "pesticide_amount":
        obj.Pesticide_Amount = parseFloat(value);
        break;
      case "sowing_date":
        obj.sowing_date = value;
        break;
      case "area":
        obj.area = parseFloat(value);
        break;
      default:
        break;
    }
  });

  return obj;
};
