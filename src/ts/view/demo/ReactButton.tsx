import * as React from "react";

export interface Props {
    label: string,
}

interface State {
    active: boolean,
}

export class ReactButton extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            active: false,
        };
    }

    render(): JSX.Element {
        return (
            <p>
                {this.props.label}
                <button className="btn btn-primary" onClick={()=>this.setState({active: !this.state.active})}>
                    Turn lights {this.state.active ? 'off' : 'on'}
                </button>
                <span className={'bulb' + (this.state.active ? ' active' : '')} />
            </p>
        );
    }
}
