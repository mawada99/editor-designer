import fabric from 'fabric';
import Editor from '../';
import {useEffect, useState } from 'react';
import { LOAD_FROM_LOCAL_WHEN_INIT, AUTO_SAVE_WHEN_CHANGE } from '@/config';

export default class AutoSave {
  private canvas: fabric.Canvas;
  private editor: Editor;
  private saving: boolean;
  private canSave: boolean;

  constructor (editor) {
    this.canvas = editor.canvas;
    this.editor = editor;

    this.saving = false;
    this.canSave = true;

    this.init();
  }

  private init () {
    if (AUTO_SAVE_WHEN_CHANGE) {
      this.canvas.on(this.initAutoSaveEvents());
    }
  }

  public dispose () {
    if (AUTO_SAVE_WHEN_CHANGE) {
      this.canvas.off(this.initAutoSaveEvents());
    }
  }

  public setCanSave (can) {
    this.canSave = can;
  }

  private autoSaveAction () {
    if (this.saving) return;
    this.saving = true;

    try {
      if (this.canSave) {
        localStorage.setItem('fabritor_web_json', this._getJSON());
      }
    } catch(e) {  console.log(e) }

    this.saving = false;
  }

  private _getJSON () {
    return JSON.stringify(this.editor.canvas2Json());
  }

  private initAutoSaveEvents () {
    return {
      'object:added': this.autoSaveAction.bind(this),
      'object:removed': this.autoSaveAction.bind(this),
      'object:modified': this.autoSaveAction.bind(this),
      'object:skewing': this.autoSaveAction.bind(this),
      'fabritor:object:modified': this.autoSaveAction.bind(this)
    };
  }
 // const url = window.location.href;


  public async loadFromLocale () {
    const params = new URLSearchParams(window.location.search);
  console.log(params);
  
    // const [deoms, setDeoms] = useState()
    // const [lood, setLood] = useState(false)
   
    // const attachments = params.get('attachments');
   
    // console.log('URL parameter:', attachments);
   
    // useEffect(() => {
    //   const url = attachments;
   
    //   async function fetchData() {
    //     try {
    //       // Dynamically import node-fetch
    //       const { default: fetch } = await import('node-fetch');
   
    //       const response = await fetch(url);
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //       }
    //       const json = await response.text();
    //       setLood(true)
    //       setDeoms(json);
    //       console.log('Response:', json);
    //     } catch (error) {
    //       console.error('Fetch error:', error);
    //     }
    //   }
   
    //   // Call the async function to execute the fetch
    //   if (attachments) {
    //     fetchData();
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    if (LOAD_FROM_LOCAL_WHEN_INIT) {
      try {
        const jsonStr = localStorage.getItem('fabritor_web_json')
        if (jsonStr) {
          const json = JSON.parse(jsonStr);
          await this.editor.loadFromJSON(json);
        }
      } catch(e) {  console.log(e) }
    }
  }

  public async loadFromLocal() {
    const params = new URLSearchParams(window.location.search);
    console.log(params);
  
    if (LOAD_FROM_LOCAL_WHEN_INIT) {
      try {
        let apiUrl = params.get('filePaths');
        let apiAttachments = params.get('attachments');  // Assuming the API URL is passed as a query parameter
  
        if (apiUrl) {
          const pathsArray = apiUrl.split('$'); // Split by '$' to check for multiple paths
          apiUrl = pathsArray[0]; // Use the first path if there are multiple, or the single one
  
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const json = await response.json(); // Use if the API returns JSON directly
          await this.editor.loadFromJSON(json);
        }

        if (apiAttachments) {
          const response = await fetch(apiAttachments);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const json = await response.json(); // Use if the API returns JSON directly
          await this.editor.loadFromJSON(json);
        }
      } catch (e) {
        console.log('Error loading data from API:', e);
      }
    }
  }
  
  

}