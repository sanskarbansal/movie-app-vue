const store = {} as any;

export const session = (req: any, _: any, next: any) => {
    const SID = req.headers.authorization;
    // if (!SID) {
    //     return resp.json({ message: "Please create a session first!" }).status(403);
    // }
    if (!store[SID] && SID) {
        store[SID] = { data: {} };
    }
    req.session = store[SID] || {};

    req.session.clear = () => {
        if (SID) {
            store[SID] = {};
        }
    };
    req.session.add = (key: number | string, value: any) => {
        if (SID && store[SID]) {
            if (!store[SID].data) store[SID].data = {};
            store[SID]["data"][key] = value;
        }
    };

    next();
};
