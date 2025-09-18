import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startStory, makeChoice, advanceStory, setCurrentSpeaker } from '../../store/slices/narrativeSlice';
import { ArrowLeft, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './NarrativeScreen.css';

const NarrativeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    currentStory, 
    currentChoices, 
    storyProgress, 
    currentSpeaker,
    storyData 
  } = useSelector((state) => state.narrative);

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);

  // Sample story data
  const sampleStory = {
    id: 'tutorial',
    title: 'The Crown\'s Burden',
    currentScene: {
      id: 'intro',
      title: 'A New Reign Begins',
      text: 'You sit upon the throne, the weight of the crown heavy upon your brow. The courtiers whisper among themselves, waiting for your first decree as the new monarch. The grand hall is filled with nobles, advisors, and common folk alike, all eager to see what kind of ruler you will become.',
      speaker: 'Narrator',
      background: 'throne_room',
      music: 'royal_theme',
      choices: [
        { 
          id: 'diplomatic', 
          text: 'Call for a council of advisors to discuss the kingdom\'s affairs', 
          consequence: 'diplomatic_path',
          description: 'A wise and measured approach'
        },
        { 
          id: 'military', 
          text: 'Inspect the royal guard and review military readiness', 
          consequence: 'military_path',
          description: 'Show strength and authority'
        },
        { 
          id: 'economic', 
          text: 'Review the treasury reports and economic situation', 
          consequence: 'economic_path',
          description: 'Focus on prosperity and trade'
        },
      ],
    }
  };

  useEffect(() => {
    if (!currentStory) {
      dispatch(startStory({ 
        storyId: 'tutorial', 
        chapterId: 1, 
        sceneId: 'intro' 
      }));
    }
  }, [currentStory, dispatch]);

  useEffect(() => {
    if (sampleStory.currentScene) {
      typeText(sampleStory.currentScene.text);
      setCurrentSpeaker(sampleStory.currentScene.speaker);
    }
  }, [sampleStory.currentScene]);

  const typeText = (text) => {
    setIsTyping(true);
    setDisplayedText('');
    let index = 0;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        setShowChoices(true);
        clearInterval(timer);
      }
    }, 30);
  };

  const handleChoice = (choice) => {
    dispatch(makeChoice({ 
      choiceId: choice.id, 
      consequence: choice.consequence 
    }));
    
    setShowChoices(false);
    setDisplayedText('');
    
    // Simulate story progression
    setTimeout(() => {
      const nextText = `You chose to ${choice.text.toLowerCase()}. This decision will shape your reign and the future of your kingdom. The courtiers nod in approval, and you can see the wheels of fate beginning to turn.`;
      typeText(nextText);
    }, 1000);
  };

  const handleSkip = () => {
    if (isTyping) {
      // Skip typing animation
      setDisplayedText(sampleStory.currentScene.text);
      setIsTyping(false);
      setShowChoices(true);
    } else {
      // Skip to next scene (placeholder)
      console.log('Skipping to next scene...');
    }
  };

  const getSpeakerPortrait = (speaker) => {
    switch (speaker) {
      case 'Narrator': return '👑';
      case 'Advisor': return '👨‍💼';
      case 'Guard Captain': return '🛡️';
      case 'Merchant': return '💰';
      default: return '👤';
    }
  };

  return (
    <div className="narrative-screen">
      <div className="narrative-header">
        <button className="btn btn-secondary" onClick={() => navigate('/game')}>
          <ArrowLeft className="btn-icon" />
          Back to Game
        </button>
        <h1>{sampleStory.title}</h1>
        <div className="header-controls">
          <button className="btn btn-secondary" onClick={handleSkip}>
            <SkipForward className="btn-icon" />
            Skip
          </button>
        </div>
      </div>

      <div className="narrative-content">
        <div className="story-background">
          <div className="background-image throne-room"></div>
          <div className="background-overlay"></div>
        </div>

        <div className="dialogue-container">
          <div className="speaker-info">
            <div className="speaker-portrait">
              {getSpeakerPortrait(currentSpeaker)}
            </div>
            <div className="speaker-details">
              <h3>{currentSpeaker}</h3>
              <div className="story-progress">
                <span>Chapter 1 - Scene 1</span>
              </div>
            </div>
          </div>

          <div className="dialogue-box">
            <div className="dialogue-text">
              {displayedText}
              {isTyping && <span className="typing-cursor">|</span>}
            </div>
          </div>

          {showChoices && (
            <div className="choices-container">
              <h4>What will you do?</h4>
              <div className="choices-list">
                {sampleStory.currentScene.choices.map((choice, index) => (
                  <div
                    key={choice.id}
                    className="choice-item"
                    onClick={() => handleChoice(choice)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="choice-content">
                      <span className="choice-text">{choice.text}</span>
                      <span className="choice-description">{choice.description}</span>
                    </div>
                    <div className="choice-number">{index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="narrative-footer">
        <div className="story-stats">
          <span>Progress: {storyProgress}%</span>
          <span>Choices Made: 0</span>
        </div>
        <div className="story-controls">
          <button className="btn btn-secondary btn-small">
            <Volume2 className="btn-icon" />
            Sound
          </button>
          <button className="btn btn-secondary btn-small">
            Auto
          </button>
        </div>
      </div>
    </div>
  );
};

export default NarrativeScreen;