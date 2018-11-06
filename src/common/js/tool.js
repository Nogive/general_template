/**
 * 格式化打卡日期
 * @param [1-7]
 * @returns string
 */
export function transferWeek2Chinese(val) {
  let reg_6_1 = /1,2,3,4,5,6/; //周一至周六
  let reg_6_2 = /2,3,4,5,6,7/; //周二至周六
  let reg_5_1 = /1,2,3,4,5/; //周一至周五
  let reg_5_2 = /2,3,4,5,6/; //周二至周六
  let reg_5_3 = /3,4,5,6,7/; //周三至周日
  let result = "";
  let str = val.join();
  let len = val.length;
  if (len == 7) {
    result = "周一至周日";
  } else if (len == 6) {
    if (reg_6_1.test(str)) {
      result = "周一至周六";
    } else if (reg_6_2.test(str)) {
      result = "周二至周日";
    } else {
      result = getText(val);
    }
  } else if (len == 5) {
    if (reg_5_1.test(str)) {
      result = "周一至周五";
    } else if (reg_5_2.test(str)) {
      result = "周二至周六";
    } else if (reg_5_3.test(str)) {
      result = "周三至周日";
    } else {
      result = getText(val);
    }
  } else {
    result = getText(val);
  }
  return result;
}
function getText(arr) {
  let str = "";
  arr.forEach(e => {
    str += getDateText(e) + ",";
  });
  return str.substring(0, str.length - 1);
}
function getDateText(i) {
  i = parseInt(i);
  let str = "";
  switch (i) {
    case 7:
      str = "周日";
      break;
    case 1:
      str = "周一";
      break;
    case 2:
      str = "周二";
      break;
    case 3:
      str = "周三";
      break;
    case 4:
      str = "周四";
      break;
    case 5:
      str = "周五";
      break;
    case 6:
      str = "周六";
      break;
  }
  return str;
}

/**
 * 格式化打卡班次
 * @param [{id:xxx,beforeWorkTime:xxx,afterWorkTime:xxx},{...}]
 * @returns string
 */
export function calculateShift(val) {
  let result = [];
  val.forEach(e => {
    let temp = e.beforeWorkTime + " - " + e.afterWorkTime;
    result.push(temp);
  });
  return result.join(",");
}
/**
 * 格式化打卡位置
 * @param [{id:xxx,shortAddress:xxx,address:xxx,lng:xxx,lat:...},{...}]
 * @returns string
 */
export function calculatePosition(val) {
  let result = [];
  val.forEach(e => {
    let temp =
      e.shortAddress && e.shortAddress != "" ? e.shortAddress : e.address;
    result.push(temp);
  });
  return result.join(",");
}
