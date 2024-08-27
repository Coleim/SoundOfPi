
import './ConstantSelection.css'
import piLogo from './assets/Pi-symbol.png'
import expoLogo from './assets/expo.png'
import phiLogo from './assets/nombre-d-or-phi-01.png'


export type Constant = 'pi' | 'e' | 'phi';

export type ConstantSelectionProps = {
    constant?: Constant;
    onConstantChange: (val: Constant) => void;
};

export function ConstantSelection({
    constant,
    onConstantChange,
}: ConstantSelectionProps
) {
    return (
        <div className="all-constants">
            <div className="constant-container">
                <button className={"const-btn "+(constant==='pi'?"const-btn--selected":"") }>
                    <img src={piLogo} onClick={ () => onConstantChange('pi') }/>
                </button>
                <span>Pi</span>
            </div>
            <div className="constant-container">
                <button className={"const-btn "+(constant==='e'?"const-btn--selected":"") }>
                    <img src={expoLogo} onClick={ () => onConstantChange('e') }/>
                </button>
                <span>Exponentielle</span>
            </div>
            <div className="constant-container">
                <button className={"const-btn "+(constant==='phi'?"const-btn--selected":"") }>
                    <img src={phiLogo} onClick={ () => onConstantChange('phi') }/>
                </button>
                <span>Nombre d'or</span>
            </div>
        </div>
    )
}

