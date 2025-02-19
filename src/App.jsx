import { useEffect, useState } from "react";
import "./App.css";
import { Wrapper } from "./components/Wrapper";
import { EnglishSets, RussianSets } from "./assets/Sets";
import { Menu } from "./components/Menu";
import { GameFinished } from "./components/GameFinished";
import { CountdownComponent } from "./components/CountdownComponent";
import { RoleDistribution } from "./components/RoleDistribution";
import { EditSet } from "./components/EditSet";
import { Sets } from "./components/Sets";
import { Timer } from "./components/Timer";
import { Spies } from "./components/Spies";
import { Players } from "./components/Players";

function App() {
  // defaults
  const defaultValue = {
    defaultPlayers: 3,
    defaultSpies: 1,
    defaultTimer: 3,
    minPlayers: 3,
    maxPlayers: 20,
    minSpies: 1,
    maxTimer: 15,
    minTimer: 1,
    defaultSetChecked: "Basic",
    neutralBoxTextEnglish: "Tap to check the place",
    neutralBoxTextRussian: "Нажми, чтобы увидеть место",
  };

  // states
  const [currentId, setCurrentId] = useState("menu");
  const [players, setPlayers] = useState(() => {
    const savedPlayers = sessionStorage.getItem("players");
    return savedPlayers
      ? JSON.parse(savedPlayers)
      : defaultValue.defaultPlayers;
  });
  const [spies, setSpies] = useState(() => {
    const savedSpies = sessionStorage.getItem("spies");
    return savedSpies ? JSON.parse(savedSpies) : defaultValue.defaultSpies;
  });
  const [timer, setTimer] = useState(() => {
    const savedTimer = sessionStorage.getItem("timer");
    return savedTimer ? JSON.parse(savedTimer) : defaultValue.defaultTimer;
  });
  const [sets, setSets] = useState(() => {
    const savedSets = localStorage.getItem("sets");
    return savedSets ? JSON.parse(savedSets) : EnglishSets;
  });
  const [selectedSets, setSelectedSets] = useState(() => {
    const savedSelectedSets = sessionStorage.getItem("selectedSets");
    return savedSelectedSets ? JSON.parse(savedSelectedSets) : [EnglishSets[0]];
  });
  const [editedSet, setEditedSet] = useState(sets[0]);
  const [newPlace, setNewPlace] = useState("");
  const [newSet, setNewSet] = useState("");
  const [currentPlace, setCurrentPlace] = useState("");
  const [currentSpies, setCurrentSpies] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [neutralBoxText, setNeutralBoxText] = useState(
    defaultValue.neutralBoxTextEnglish
  );
  const [isEnglish, setIsEnglish] = useState(true);

  // functions
  function valuetext(value) {
    return `${value}`;
  }
  function minutes(value) {
    if (isEnglish) {
      return `${value} min`;
    } else {
      return `${value} мин`;
    }
  }
  const handlePlayersChange = (value) => {
    setPlayers(value);
    sessionStorage.setItem("players", JSON.stringify(value));
  };
  const handleSpiesChange = (value) => {
    setSpies(value);
    sessionStorage.setItem("spies", JSON.stringify(value));
  };
  const handleTimerChange = (value) => {
    setTimer(value);
    sessionStorage.setItem("timer", JSON.stringify(value));
  };
  const handleSelectedSetsChange = (value, label) => {
    if (value) {
      setSelectedSets([...selectedSets, sets.find((x) => x.name === label)]);
      sessionStorage.setItem(
        "selectedSets",
        JSON.stringify([...selectedSets, sets.find((x) => x.name === label)])
      );
    } else {
      setSelectedSets(selectedSets.filter((x) => x.name !== label));
      sessionStorage.setItem(
        "selectedSets",
        JSON.stringify(selectedSets.filter((x) => x.name !== label))
      );
    }
  };
  const handleEditIconClick = (set) => {
    setEditedSet(set);
    setCurrentId("editSet");
  };
  const handleAddPlaceIconClick = () => {
    if (!newPlace.trim()) return;

    var newSets = sets.filter((x) => x.name !== editedSet.name);
    const newSet = {
      ...editedSet,
      locations: [...editedSet.locations, newPlace],
    };
    newSets.push(newSet);
    setSets(newSets);
    localStorage.setItem("sets", JSON.stringify(newSets));
    setEditedSet(newSet);
    setNewPlace("");
  };
  const handleDeletePlaceIconClick = (location) => {
    var newSets = sets.filter((x) => x.name !== editedSet.name);
    const newSet = {
      ...editedSet,
      locations: [...editedSet.locations.filter((x) => x !== location)],
    };
    newSets.push(newSet);
    setSets(newSets);
    localStorage.setItem("sets", JSON.stringify(newSets));
    setEditedSet(newSet);
    setNewPlace("");
  };
  const handleAddSetIconClick = () => {
    if (!newSet.trim()) return;
    const newS = { name: newSet, locations: [], default: false };
    const newSets = [...sets, newS];
    setSets(newSets);
    localStorage.setItem("sets", JSON.stringify(newSets));
    setNewSet("");
  };
  const handleRemoveSetIconClick = (set) => {
    setSets([...sets.filter((x) => x.name !== set.name)]);
    localStorage.setItem(
      "sets",
      JSON.stringify([...sets.filter((x) => x.name !== set.name)])
    );
  };
  const handleCountdownOnComplete = () => {
    setCurrentId("gameFinished");
  };
  const handleChangeBoxInDistribution = () => {
    setCurrentPlayer(currentPlayer + 0.5);
    if (currentPlayer >= players) {
      if (isEnglish) {
        setNeutralBoxText("START THE GAME");
      } else {
        setNeutralBoxText("НАЧАТЬ ИГРУ");
      }
    }
    if (currentPlayer >= players + 0.5) {
      setCurrentId("countdown");
    }
  };
  const handleLanguageChange = () => {
    setIsEnglish(!isEnglish);
  };
  const changeSetsInTheAccordanceWithLanguage = () => {
    const nonDefault = JSON.parse(localStorage.getItem("sets"))
      .flat()
      .filter((x) => !x.default);
    var newSetsToBeSet = [...nonDefault];
    if (isEnglish) {
      newSetsToBeSet = [...newSetsToBeSet, ...EnglishSets];
    } else {
      newSetsToBeSet = [...newSetsToBeSet, ...RussianSets];
    }
    setSets(newSetsToBeSet);
    localStorage.setItem("sets", JSON.stringify(newSetsToBeSet));
  };
  const playersSliderMarks = Array.from(
    { length: defaultValue.maxPlayers - defaultValue.minPlayers + 1 },
    (_, index) => ({
      value: defaultValue.minPlayers + index,
      label: (defaultValue.minPlayers + index).toString(),
    })
  );
  const spiesSliderMarks = Array.from(
    {
      length: Math.round(players / 3) - defaultValue.minSpies + 1,
    },
    (_, index) => ({
      value: defaultValue.minSpies + index,
      label: (defaultValue.minSpies + index).toString(),
    })
  );
  const timerSliderMarks = Array.from(
    {
      length: defaultValue.maxTimer - defaultValue.minTimer + 1,
    },
    (_, index) => ({
      value: defaultValue.minTimer + index,
      label: (defaultValue.minTimer + index).toString(),
    })
  );
  const generatePlace = () => {
    const places = sets
      .filter((x) => selectedSets.map((x) => x.name).includes(x.name))
      .map((x) => x.locations)
      .flat();
    const place = places[Math.floor(Math.random() * places.length)];
    setCurrentPlace(place);
  };
  const generateSpies = () => {
    var curPlayers = Array.from({ length: players }, (_, i) => i + 1);
    var chosenSpies = [];
    for (let i = 0; i < spies; i++) {
      chosenSpies.push(
        curPlayers.splice(Math.floor(Math.random() * curPlayers.length), 1)[0]
      );
    }
    setCurrentSpies(chosenSpies);
  };

  useEffect(() => {
    if (currentId === "roleDistribution") {
      generatePlace();
      generateSpies();
      setCurrentPlayer(0.5);
      if (isEnglish) {
        setNeutralBoxText(defaultValue.neutralBoxTextEnglish);
      } else {
        setNeutralBoxText(defaultValue.neutralBoxTextRussian);
      }
    }
  }, [currentId]);

  useEffect(() => {
    if (!isEnglish) {
      setNeutralBoxText(defaultValue.neutralBoxTextRussian);
    } else {
      setNeutralBoxText(defaultValue.neutralBoxTextEnglish);
    }
    if (localStorage.getItem("sets")) {
      changeSetsInTheAccordanceWithLanguage();
    }
  }, [isEnglish]);

  return (
    <>
      <Wrapper id="players" currentId={currentId}>
        <Players
          players={players}
          handlePlayersChange={handlePlayersChange}
          valuetext={valuetext}
          playersSliderMarks={playersSliderMarks}
          min={defaultValue.minPlayers}
          max={defaultValue.maxPlayers}
          setCurrentId={setCurrentId}
          isEnglish={isEnglish}
        />
      </Wrapper>
      <Wrapper id="spies" currentId={currentId}>
        <Spies
          spies={spies}
          handleSpiesChange={handleSpiesChange}
          valuetext={valuetext}
          spiesSliderMarks={spiesSliderMarks}
          min={defaultValue.minSpies}
          max={Math.round(players / 3)}
          setCurrentId={setCurrentId}
          isEnglish={isEnglish}
        />
      </Wrapper>
      <Wrapper id="timer" currentId={currentId}>
        <Timer
          timer={timer}
          handleTimerChange={handleTimerChange}
          minutes={minutes}
          timerSliderMarks={timerSliderMarks}
          min={defaultValue.minTimer}
          max={defaultValue.maxTimer}
          setCurrentId={setCurrentId}
          isEnglish={isEnglish}
        />
      </Wrapper>
      <Wrapper id="sets" currentId={currentId}>
        <Sets
          sets={sets}
          selectedSets={selectedSets}
          handleSelectedSetsChange={handleSelectedSetsChange}
          handleEditIconClick={handleEditIconClick}
          handleRemoveSetIconClick={handleRemoveSetIconClick}
          newSet={newSet}
          setNewSet={setNewSet}
          handleAddSetIconClick={handleAddSetIconClick}
          setCurrentId={setCurrentId}
          isEnglish={isEnglish}
        />
      </Wrapper>
      <Wrapper id="editSet" currentId={currentId}>
        <EditSet
          editedSet={editedSet}
          handleDeletePlaceIconClick={handleDeletePlaceIconClick}
          setNewPlace={setNewPlace}
          handleAddPlaceIconClick={handleAddPlaceIconClick}
          setCurrentId={setCurrentId}
          newPlace={newPlace}
        />
      </Wrapper>
      <Wrapper id="roleDistribution" currentId={currentId}>
        <RoleDistribution
          currentPlayer={currentPlayer}
          neutralBoxText={neutralBoxText}
          handleChangeBoxInDistribution={handleChangeBoxInDistribution}
          currentPlace={currentPlace}
          isSpy={currentSpies.includes(currentPlayer)}
          setCurrentId={setCurrentId}
          isEnglish={isEnglish}
        />
      </Wrapper>
      <Wrapper id="countdown" currentId={currentId}>
        <CountdownComponent
          setCurrentId={setCurrentId}
          handleCountdownOnComplete={handleCountdownOnComplete}
          timer={timer}
          isEnglish={isEnglish}
        />
      </Wrapper>
      <Wrapper id="gameFinished" currentId={currentId}>
        <GameFinished setCurrentId={setCurrentId} isEnglish={isEnglish} />
      </Wrapper>
      <Wrapper id="menu" currentId={currentId}>
        <Menu
          setCurrentId={setCurrentId}
          handleLanguageChange={handleLanguageChange}
          isEnglish={isEnglish}
        />
      </Wrapper>
    </>
  );
}

export default App;
