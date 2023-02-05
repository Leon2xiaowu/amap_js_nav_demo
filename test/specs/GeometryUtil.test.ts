import { GeometryUtil } from "../../src/modules/GeometryUtil/GeometryUtil";

describe("Test GeometryUtil", () => {
  test("is point on line", () => {
    const path =
      "120.76219,31.302116;120.761718,31.302092;120.761434,31.302076;120.761348,31.302071;120.761348,31.302071;120.7585,31.301942;120.7585,31.301942;120.757298,31.301883;120.757309,31.30176;120.761455,31.301969"
        .split(";")
        .map((lnglat) => lnglat.split(","));
    const util = GeometryUtil;

    const arrayLnglatList = path.map(([lng, lat]) => [+lng, +lat]) as [
      number,
      number
    ][];

    expect(util.isPointOnLine([120.76219, 31.30212], arrayLnglatList, 10)).toBe(
      true
    );

    expect(util.isPointOnLine([120.76, 31.3], arrayLnglatList, 10)).toBe(false);

    const objLnglatList = path.map(([lng, lat]) => ({ lng, lat }));

    // @ts-ignore
    expect(util.isPointOnLine([120.76219, 31.30212], objLnglatList, 10)).toBe(
      true
    );
  });

  test("get latlng path angle", () => {
    const prevPoint = [120.76219, 31.30211600000001];
    const currentPoint = [120.761718, 31.302092];
    const expectOne = 266.6;
    const expectTwo = 86.6;

    expect(GeometryUtil.getAngle(prevPoint, currentPoint)).toBe(expectOne);
    expect(GeometryUtil.getAngle(currentPoint, prevPoint)).toBe(expectTwo);
    expect(GeometryUtil.getAngle(prevPoint, prevPoint)).toBe(false);
  });
});
