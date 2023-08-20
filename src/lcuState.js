const lcuState = window.LCU?.State || {};

const lcuStateDefaults = {
    Key: 'value',
};

// const LCUState = lcuState || lcuStateDefaults;
let LCUState = lcuStateDefaults;

LCUState = {
    ...lcuStateDefaults,
    ...(lcuState || {})
};

export default LCUState;