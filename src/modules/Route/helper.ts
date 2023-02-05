import { DrivingResult, DrivingStep, TmcsPaths } from "../Map/toolkit";

function concatPathHandle(last:TmcsPaths, current: TmcsPaths) {
  last.path.push.apply(last.path, current.path.slice(0, 2));
  current.path.splice(0, 1);
}

/**
 * 获取针对 AMap.Driving Response 处理过后的路径数据
 * 
 * @param line new AMap.Driving Response
 * @returns 
 */
export function getTmcsMultLinePath(line: DrivingResult): TmcsPaths[] {
  let lastRoad: string;

  return line.routes[0].steps.reduce(
    (result: TmcsPaths[], step: DrivingStep, index: number) => {
      const nowRoad = `${step.road}-${step.orientation}`;
      // console.log(nowRoad, lastRoad);
      const isSameRoad = nowRoad === lastRoad;
      const isTurnOff = !isSameRoad;
      const lastPath = result[result.length - 1];
      const tmcsPaths = step.tmcsPaths
      let concatPath = true
      // 处理拐弯时候的路径平滑
      // if (step.road == '黑陈路') {
      //   debugger
      // }
      if (lastPath ) {
        const tmcs = step.tmcsPaths[0];
        lastPath.path.push.apply(lastPath.path, tmcs.path.slice(0, 2));
        // 如果一段线路只有一个点，那就不单独开了，并入上一个段线路
        if (tmcs.path.length <= 2) {
          tmcs.path = []
        } else {
          tmcs.path.splice(0, 1);
        }
        if (!tmcs.path.length && step.tmcsPaths.length <= 1) {
          concatPath = false
        }
      }
      for (let index = 0; index < tmcsPaths.length - 1; index++) {
        const element = tmcsPaths[index];
        const next = tmcsPaths[index+1]
        if (element.status != next.status) {
          concatPathHandle(element,next,)
        }
      }
      if (concatPath) {
        result.push.apply(result, tmcsPaths);
      }

      lastRoad = nowRoad;
      return result;
    },
    []
  );
}
