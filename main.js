function getQueryString() {
  var result = {}, queryString = location.search.slice(1),
      re = /([^&=]+)=([^&]*)/g, m;

  while (m = re.exec(queryString)) {
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  return result;
}


var genero = getQueryString()["genero"];
var idade =  getQueryString()["idade"];
var altura = getQueryString()["altura"];
var peso = getQueryString()["peso"];
var benedict = getQueryString()["benedict"];
if(genero){
  var tmb = calcularTmb(genero, idade, altura, peso);
  var tmbBenedict = calcularBenedict(tmb, benedict);
  var low = low(tmbBenedict);
  var high = high(tmbBenedict);

  document.getElementById("tmb").innerHTML = "A sua taxa de metabolismo basal é de " + tmb.toFixed(0) + "kcal.";
  document.getElementById("benedict").innerHTML = "Com base em seu " + benedict + " nível de atividade diária, são necessárias <b>" + tmbBenedict.toFixed(0) + "</b>kcal para manter o peso atual.";
  document.getElementById("low").innerHTML = "Para objetivos de perda de peso. Com base em um defict calórico de 20%, você deverá consumir até <b>" + low.toFixed(0) + "</b>kcal.";
  document.getElementById("high").innerHTML = "Para objetivos de ganho de massa magra. Com base em um aumento de 15%, você deverá consumir <b>" + high.toFixed(0) + "</b>kcal.";
}

function calcularTmb(genero, idade, altura, peso){

  var tmbBase = 0;

  if(genero === 1){
    tmbBase = 655.1 + (9.563 * peso) + (1.85 * altura) - (4.676 * idade);
  
  }else{
    tmbBase = 66.47 + (13.75 * peso) + (5.003 * altura) - (6.755 * idade);
  }

  return tmbBase;

}

function low(tmbBenedict){
  return tmbBenedict * 0.8;
}

function high(tmbBenedict){
  return tmbBenedict * 1.15;
}

function CopyToClipboard(containerid) {
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select().createTextRange();
    document.execCommand("copy");
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().addRange(range);
    document.execCommand("copy");
    
  }
  btnCopiarAction();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function btnCopiarAction(){
  $('#btnCopiar').val('Copiado!');
    await sleep(300);
  $('#btnCopiar').val('Copiar resultado');
}

function calcularBenedict(tmbBase, benedict){
  
  //Little/no exercise: BMR * 1.2 = Total Calorie Need
  //Light exercise: BMR * 1.375 = Total Calorie Need
  //Moderate exercise (3-5 days/wk): BMR * 1.55 = Total Calorie Need
  //Very active (6-7 days/wk): BMR * 1.725 = Total Calorie Need
  //Extra active (very active & physical job): BMR * 1.9 = Total Calorie Need

  switch (benedict) {
    case 'pouco':
      return  tmbBase * 1.2;
      break;
    case 'leve':
      return  tmbBase * 1.375;
      break;
    case 'moderado':
      return  tmbBase * 1.55;
      break;
    case 'intenso':
      return  tmbBase * 1.725;
      break;
    case 'maximo':
      return  tmbBase * 1.9;      
      break;
    default:
      console.log(`Atividade ${benedict}. Não reconhecida`);
  }
}
