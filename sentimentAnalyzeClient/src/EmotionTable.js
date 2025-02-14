import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                Object.entries(this.props.emotions).map(([key, value]) => {
                    return (
                        <tr>
                            <th scope="row">{key}</th>
                            <td>{value}</td>
                        </tr>
                    )
                })
            }
            </tbody>
          </table>
          </div>
          );
    }
    
}
export default EmotionTable;