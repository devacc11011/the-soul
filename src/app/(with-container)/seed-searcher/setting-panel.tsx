import {deckOption, lockOptions, stakeOption, versionOption} from "@/const/SeedOptions";
import React, {useEffect, useState} from "react";
import {SeedConfig, LockOption, AnalSeedConfig} from "@/types/SeedOptionTypes";

export default function SettingPanel({performAnalysis}: { performAnalysis: (seedConfig: AnalSeedConfig) => void }) {
  //seed option
  const [seedInput, setseedInput] = useState('ALEEB');
  const [deckSelect, setdeckSelect] = useState<typeof deckOption[number]>(deckOption[0]);
  const [stakeSelect, setstakeSelect] = useState<typeof stakeOption[number]>(stakeOption[0]);
  const [versionSelect, setversionSelect] = useState(versionOption[0].key);
  const [lockOption, setLockOption] = useState<LockOption>(lockOptions);
  const [anteInput, setAnte] = useState(39)
  const [cardsPerAnteInput, setCardsPerAnte] = useState('50,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150');

  const handleStakeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setstakeSelect(e.target.value as typeof stakeOption[number]);
  }
  const handleDeckSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setdeckSelect(e.target.value as typeof deckOption[number]);
  }
  const handleAnteInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnte(e.target.value as unknown as number);
  }
  const handleCardsPerAnte = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardsPerAnte(e.target.value);
  }
  const handleVersionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setversionSelect(e.target.value as unknown as number);
  }
  const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setseedInput(e.target.value);
  };
  //end

  //lockBox
  const [isOpenLockBox, setOpenLockBox] = useState(false);
  const handleLockBox = (onOff?: unknown): undefined => {
    if (typeof onOff !== "boolean") {
      setOpenLockBox(!isOpenLockBox)
    } else if (onOff) {
      setOpenLockBox(true)
    } else {
      setOpenLockBox(false)
    }
  }

  const saveLock = (newOptions: LockOption) => {
    setLockOption(() => newOptions);
    handleLockBox(false)
  }

  const handleUnlock = () => {
    const newOption: LockOption = {}
    Object.entries(lockOptions)
        .map(([key, val]) => {
          newOption[key] = {
            name: val.name,
            selected: true
          }
        })
    saveLock(newOption)
  }
  const handleLock = () => {
    const newOption: LockOption = {}
    Object.entries(lockOptions)
        .map(([key, val]) => {
          newOption[key] = {
            name: val.name,
            selected: false
          }
        })
    saveLock(newOption)
  }
  const handleLockBoxChange = (key: string) => {
    setLockOption((prevState) => {
      const newItem = {
        ...prevState[key],
        selected: !prevState[key].selected
      };
      return {
        ...prevState,
        [key]: newItem,
      };
    });
  };

  //lock end

  function saveConfig() {
    const configs = getConfigs();
    configs[seedInput] = {
      deckSelect,
      stakeSelect,
      versionSelect,
      anteInput,
      cardsPerAnteInput,
      lockOption,
      createdTime: new Date().getTime()
    }
    localStorage.setItem("configs", JSON.stringify(configs));
  }

  const [recentConfig, setRecentConfig] = useState<SeedConfig>({})

  function refreshConfig() {
    const config = getConfigs();
    setRecentConfig(config)
  }

  function getConfigs() {
    return (JSON.parse(localStorage.getItem('configs') ?? '{}')) as unknown as SeedConfig
  }

  useEffect(() => {
    refreshConfig()
  }, []);

  function loadConfig(seed: string): undefined {
    const loadedInput = recentConfig[seed]
    const {
      deckSelect,
      stakeSelect,
      versionSelect,
      anteInput,
      cardsPerAnteInput,
      lockOption
    } = loadedInput
    setseedInput(seed)
    setdeckSelect(deckSelect)
    setstakeSelect(stakeSelect)
    setversionSelect(versionSelect)
    setAnte(anteInput)
    setCardsPerAnte(cardsPerAnteInput)
    setLockOption(lockOption)
  }

  async function copySeed(): Promise<undefined> {
    await navigator.clipboard.writeText(seedInput);
    alert("Copied!");
  }

  function analPreprocess() {
    performAnalysis({
      seedInput,
      deckSelect,
      stakeSelect,
      versionSelect,
      lockOption,
      anteInput,
      cardsPerAnteInput
    })
    saveConfig()
    refreshConfig()
  }

  //reactive anteinput
  useEffect(() => {
    let str = '50'
    for (let i = 1; i < anteInput; i++) {
      str += ',150'
    }
    setCardsPerAnte(str)
  }, [anteInput]);

  return <>
    <div className='card bg-base-300 p-3 md:col-span-2'>
      <h1 className='text-accent font-semibold'>Recent</h1>
      <ul className={'flex overflow-x-auto'}>
        {Object.entries(recentConfig)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .sort(([key, val], [key2, val2]) =>
                val2.createdTime - val.createdTime)
            .map(([key], index) =>
                <li key={index} className={'mx-2 clickable'}
                    onClick={loadConfig.bind(null, key)}>{key}</li>)}
      </ul>
    </div>
    <div className="card bg-base-300 p-3">
      <h1 className='text-accent font-semibold'>Settings</h1>
      <label className='label' htmlFor="seed">Seed</label>
      <div className={'join'}>
        <input className='input join-item' type="text" maxLength={8} pattern="[A-Z1-9]{1,8}" required
               value={seedInput}
               onChange={handleSeedChange}/>
        <button className={'btn btn-secondary join-item'} onClick={copySeed}>Copy</button>
      </div>
      <br/>
      <label className='label' htmlFor="ante">Max Ante:</label>
      <input className='input' type="number" value={anteInput} onChange={handleAnteInput} min="1"
             max="999" required/>
      <br/>
      <label className='label' htmlFor="cardsPerAnte">Cards per Ante:</label>
      <input className='input' type="text" id="cardsPerAnte"
             value={cardsPerAnteInput}
             onChange={handleCardsPerAnte}
             required/>
      <br/>
      <label className='label' htmlFor="deck">Deck:</label>
      <select className='select' required onChange={handleDeckSelect}
              value={deckSelect}>
        {
          deckOption.map((option) =>
              <option key={option} value={option}>{option}</option>
          )
        }
      </select>
      <br/>
      <label className='label' htmlFor="stake">Stake:</label>
      <select className='select' value={stakeSelect} required onChange={handleStakeSelect}>
        {
          stakeOption.map((option, index) =>
              <option key={index} value={option}>{option}</option>
          )
        }
      </select>
      <br/>
      <label className='label' htmlFor="version">Version:</label>
      <select className='select' id="version" required
              value={versionSelect}
              onChange={handleVersionSelect}>
        {
          versionOption.map((option) =>
              <option key={option.key} value={option.key}>{option.name}</option>
          )
        }
      </select>
      <br/>
      <button className='btn btn-primary btn-outline' onClick={handleLockBox}>Modify Unlocks</button>
      {isOpenLockBox && <div>
          <div className='flex'>
              <button className='btn btn-secondary grow m-1' onClick={handleUnlock}>Unlock All</button>
              <button className='btn btn-secondary grow m-1' onClick={handleLock}>Lock All</button>
          </div>
          <div id="checkboxesPopup">
              <h2>Unlocked Items</h2>
              <ul className='list-group'>
                {Object.entries(lockOption).map(([key, data]) => (
                    <li key={key}>
                      <input className='checkbox'
                             type="checkbox"
                             id={key}
                             checked={lockOption[key].selected}
                             onChange={() => handleLockBoxChange(key)}
                      />
                      <label className='label' htmlFor={key}>{data.name}</label>
                    </li>
                ))}
              </ul>
          </div>
      </div>
      }
      <br/>
      <button onClick={analPreprocess} className={'btn btn-primary'}>Analyze</button>
    </div>
  </>
}