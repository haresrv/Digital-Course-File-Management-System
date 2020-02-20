import React from 'react'
import ReactDOM from 'react-dom'
import '../../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css';
import FileBrowser, {Icons} from 'react-keyed-file-browser'
 
var mount = document.querySelectorAll('div.browser-mount');
class FileExplore extends React.Component
{
    componentDidMount()
{
    
    if(props.authProps.role=="Admin")
        props.history.push("/admin")

}
    render()
    {
        return(
        <FileBrowser files={[
                                {
                                key: 'cat.png',
                                modified: 0,
                                size: 1.5 * 1024 * 1024,
                                },
                                {
                                key: 'kitten.png',
                                modified: 0,
                                size: 545 * 1024,
                                },
                                {
                                key: 'elephant.png',
                                modified: 0,
                                size: 52 * 1024,
                                },
                            ]}
                                icons={Icons.FontAwesome(4)} />

    )}
}

export default FileExplore