// globals.d.ts

// Emscripten에서 제공하는 Module 객체의 최소한 타입 선언 예시입니다.
// 실제 사용 시에는 해당 모듈의 API에 맞게 타입을 상세하게 작성하는 것이 좋습니다.
declare const Module: {
    onRuntimeInitialized: (() => void) | undefined;
    VectorStr: new () => {
        push_back: (str: string) => void;
    };
};
declare const Immolate: {
    Instance: ((seed:string) => void) | undefined;
    InstParams(deck:string, stake:string, arg3:boolean, version:string):string;
    packInfo(pack:string);
    VOUCHERS: {
        size(): number;
        get(index:number): string;
    };
};
