import React, { useState } from 'react';
import Button from '../../components/UI/Button';
import GDInput from '../../components/UI/GDInput';


import rankingService from '../../services/ranking.service';


const Ranking = () => {

    const getRanking = async () => {
       await rankingService.getRanking(inputs['order'].value, inputs['page'].value);
    
    }

    const [inputs, setInputs] = useState({
        page: { value: 1 },
        order: { value: 'desc' },
      });

    const validatePage = (input) => {
        return true;
      }
    
      const validateOrder = (input) => {
        return true;
      }
    
      const validationFunctionsMap = new Map([
        ['page', validatePage],
        ['order', validateOrder],
      ]);


    const inputChangedHandler = (inputIdentifier, event, override) => {
    
        let validationState = false;
        let enteredValue;
    
        if (!override) {
          enteredValue = event.target.value;
          const validationFn = validationFunctionsMap.get(inputIdentifier);
          validationState = validationFn(enteredValue);
        } else {
          enteredValue = event;
        }
    
        setInputs((curInputValues) => {
          return {
            ...curInputValues,
            [inputIdentifier]: { value: enteredValue },
          };
        });
      };

    return (
        <><p>Salve crias!</p><view>
            <GDInput
              inputConfig={{
                placeholder: 'Número da página',
                onChange: inputChangedHandler.bind(this, 'page'),
              }}
            />
            <GDInput
                inputConfig={{
                    placeholder: 'Ordem (asc ou desc)',
                    onChange: inputChangedHandler.bind(this, 'order'),
                }}
            />
            <Button onClick={getRanking}></Button>

        </view></>
    );
}

export default Ranking;
