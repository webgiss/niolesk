import { decode, encode } from "./coder"

const exampleSets = [
    {
        name: 'Basic',
        text: '"a" -> "b"',
        base64: 'eNpTSlRS0LVTUEpSAgAKxwH3',
    },
    {
        name: 'With some non ascii char',
        text: '"a" -> "é"',
        base64: 'eNpTSlRS0LVTUDq8UgkADxEDAQ==',
    },
    {
        name: 'With a CR at the end',
        text: '"a" -> "b"\n',
        base64: 'eNpTSlRS0LVTUEpS4gIADMgCAQ==',
    },
    {
        name: 'With a CR in the middle',
        text: '"a" -> "b"\n"b" -> "c"',
        base64: 'eNpTSlRS0LVTUEpS4gJiMDNZCQArmgP5',
    },
    {
        name: 'With a CR in the middle and at the end',
        text: '"a" -> "b"\n"b" -> "c"\n',
        base64: 'eNpTSlRS0LVTUEpS4gJiMDNZiQsAL50EAw==',
    },
    {
        name: 'With some non ascii char, a CR in the middle and at the end',
        text: '"a" -> "é"\n"é" -> "c"\n',
        base64: 'eNpTSlRS0LVTUDq8UokLRIA5yUpcAE6zBhc=',
    },
    {
        name: 'With an emoji',
        text: '"a" -> "🚆"\n"🚆" -> "c"',
        base64: 'eNpTSlRS0LVTUPowf1abEheEAgskKwEAeTEIkw==',
    },
]

describe('encode', ()=>{
    const testExample = ({name, text, base64}) => {
        it(`should encode correctly for the test [${name}]`, () => {
            expect(encode(text)).toBe(base64);
        })
    }
    exampleSets.forEach((testSet) => testExample(testSet));
})

describe('decode', ()=>{
    const testExample = ({name, text, base64}) => {
        it(`should decode correctly for the test [${name}]`, () => {
            expect(decode(base64)).toBe(text);
        })
    }
    exampleSets.forEach((testSet) => testExample(testSet));
})

