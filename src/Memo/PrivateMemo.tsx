import React from 'react';

type PrivateMemoState = {
    memo: string;
}

class PMemo extends React.Component<{}, PrivateMemoState> {
    render() {
        return (
            <div>
                <input className="PrivateMemoInput"
                    type="text"
                    placeholder="プライベートメモ(仮)">
                </input>
            </div>
        );
    };
}

const PrivateMemo: React.FC = () => {
    return (
        <div className="main">
            <PMemo/>
        </div>
    )
}

export default PrivateMemo;