import "@babel/polyfill";
import './styles.css';
import { writingEffect } from './js/index'
import bootstrap from 'bootstrap'

writingEffect(document.querySelector('.ctn-usage > h1'), 150)

for(let paragraph of document.querySelectorAll('.ctn-usage > p')){
    writingEffect( paragraph, 25 )
}