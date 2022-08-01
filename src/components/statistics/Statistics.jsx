import React, {useState} from 'react'
import './statistics.scss'

function Statistics({ title }) {

    const [typeView, setTypeView] = useState(false)

    return (
        <div className="statistics">
            <div className="statisticsTop">
                <span className="statisticsTopTitle">{title}</span>
                <span className="statisticsTopContent">
                    <span className="statisticsTopContentSearch">
                        <i className="statisticsTopContentSearchIcon bi bi-search"></i>
                        <input className='statisticsTopContentSearchInput' placeholder='Search data...' type="search" />
                    </span>
                    <span className="statisticsTopContentAction">
                        <span className="statisticsTopContentActionView">
                            <i 
                                className={typeView ? 
                                    "statisticsTopContentActionViewIcon active bi bi-file-earmark-bar-graph"
                                    :
                                    "statisticsTopContentActionViewIcon bi bi-file-earmark-bar-graph"
                                }
                                onClick={()=> setTypeView(!typeView)}
                            ></i>
                            <i 
                                className={typeView ? 
                                    "statisticsTopContentActionViewIcon bi bi-filetype-exe"
                                    :
                                    "statisticsTopContentActionViewIcon active bi bi-filetype-exe"
                                }
                                onClick={()=> setTypeView(!typeView)}
                            ></i>
                        </span>
                        <button className="statisticsTopContentActionExport btnSmall btnMain">
                            Export
                        </button>
                    </span>
                </span>
            </div>
            <div className="statisticsBottom">
                Graph
            </div>
        </div>
    )
}

export default Statistics
