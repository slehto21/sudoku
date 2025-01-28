*** Settings ***
Library    SeleniumLibrary
Library    Collections
Library    SudokuSolverLibrary.py
Library    String

*** Variables ***
${BROWSER}       chrome
${URL}      http://localhost:8080
${TIMER_ID}      timer
${HINTS_ID}      hintsCounter
${WRONG_MOVES_ID}    wrongMovesCounter
${EASY_BUTTON_ID}    easyButton
${MEDIUM_BUTTON_ID}    mediumButton
${HARD_BUTTON_ID}    hardButton
${SOLVE_BUTTON_ID}    solveButton
${RESET_BUTTON_ID}    resetButton
${HINTS_BUTTON_ID}    hintButton
${GRID_SIZE}   9

*** Test Cases ***
Verify Main Buttons Are Visible
    Open Browser    ${URL}    ${BROWSER}
    Page Should Contain Button    Easy
    Page Should Contain Button    Medium
    Page Should Contain Button    Hard
    Page Should Contain Button    Solve
    Page Should Contain Button    Reset
    Close Browser

Verify Game Start
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Generate New Sudoku
    Wait Until Element Contains    id=${TIMER_ID}    00:00:03    timeout=5s
    Element Text Should Be    id=${HINTS_ID}    Hints used: 0
    Element Text Should Be    id=${WRONG_MOVES_ID}    Wrong moves: 0
    Close Browser

Verify Hints Button Increment
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Generate New Sudoku
    Click Button    id=${HINTS_BUTTON_ID}
    Element Text Should Be    id=${HINTS_ID}    Hints used: 1
    Close Browser

Verify Wrong Moves Increment
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Generate New Sudoku
    ${empty_cell}=    Find First Empty Cell
    ${conflicting_number}=    Find Conflicting Number    ${empty_cell}
    Input Text    id=${empty_cell}    ${conflicting_number}
    Sleep         1s
    ${bg_color}=    Get Element Attribute    id=${empty_cell}    style
    Should Contain    ${bg_color}    red
    Element Text Should Be    id=${WRONG_MOVES_ID}    Wrong moves: 1
    Close Browser

Validate Input Field
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Input Text    id=cell00    0
    Sleep         1s
    ${cell_value}=    Get Value    id=cell00
    Should Be Empty    ${cell_value}
    Input Text    id=cell00    10
    Sleep         1s
    ${cell_value}=    Get Value    id=cell00
    Should Be Equal As Strings    ${cell_value}    1
    Press Keys    id=cell00    BACKSPACE
    Input Text    id=cell00    !
    Sleep         1s
    ${cell_value}=    Get Value    id=cell00
    Should Be Empty    ${cell_value}
    Input Text    id=cell00    A
    Sleep         1s
    ${cell_value}=    Get Value    id=cell00
    Should Be Empty    ${cell_value}
    Input Text    id=cell00    1
    Sleep         1s
    ${cell_value}=    Get Value    id=cell00
    Should Be Equal As Strings    ${cell_value}    1
    Close Browser

Verify Game Reset
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Generate New Sudoku
    Click Button    id=${RESET_BUTTON_ID}
    ${cells}=    Get WebElements    css:.sudokuGrid input[type="text"]
    FOR    ${cell}    IN    @{cells}
        ${value}=    Get Value    ${cell}
        Should Be Empty    ${value}
    END
    Close Browser

Solve Generated Sudoku
    Open Browser    ${URL}    chrome
    Maximize Browser Window
    Generate New Sudoku
    ${initial_board}=    Read Sudoku Board
    Log Many  ${initial_board}    repr=True
    ${solved_board}=    Solve Sudoku    ${initial_board}
    Log Many  ${solved_board}    repr=True
    Input Solved Board    ${solved_board}
    Validate Sudoku Completion
    # Validate Modal
    Wait Until Element Is Visible    //div[@class='modal-content']    5s
    Element Should Be Visible        //div[@class='modal-content']
    ${header}=    Get Text    //h2[@id='completionHeader']
    Should Be Equal As Strings    ${header}    You Won!
    ${message}=    Get Text    //p[@id='completionMessage']
    Should Contain    ${message}    Time:
    Should Contain    ${message}    Wrong Moves: 0
    Should Contain    ${message}    Hints Used: 0
    Element Should Be Visible    //button[@id='newGameButton']
    Element Should Be Visible    //span[@class='close']
    Close Browser

*** Keywords ***
Find First Empty Cell
    ${cells}=    Get WebElements    css:.sudokuGrid input[type="text"]
    FOR    ${cell}    IN    @{cells}
        ${value}=    Get Value    ${cell}
        IF    '${value}' == ''    RETURN    ${cell.get_attribute("id")}
    END
    Fail    No empty cells found

Find Conflicting Number
    [Arguments]    ${cell_id}
    # Find the row, column and area numbers
    ${row}=    Get Substring    ${cell_id}    4    5
    ${col}=    Get Substring   ${cell_id}    5    6

    ${row_numbers}=    Get Numbers In Row    ${row}
    ${col_numbers}=    Get Numbers In Column    ${col}

    # Go through numbers 1-9 and return the first conflicting number
    FOR    ${num}    IN RANGE    1    10
        IF    str($num) in ${row_numbers} or str($num) in ${col_numbers}    RETURN    ${num}
    END
    Fail    Could not find a conflicting number

Get Numbers In Row
    [Arguments]    ${row}
    ${numbers}=    Create List
    ${cells}=    Get WebElements    css:.sudokuGrid input[type="text"]
    FOR    ${cell}    IN    @{cells}
        ${cell_id}=    Get Element Attribute    ${cell}    id
        Run Keyword If    '${cell_id}' != ''    Append Cell Value To List    ${cell_id}    ${cell}    ${numbers}    ${row}    row
    END
    RETURN    ${numbers}

Append Cell Value To List
    [Arguments]    ${cell_id}    ${cell}    ${numbers}    ${target}    ${type}
    ${cell_pos}=    Get Substring    ${cell_id}    4    5    # row position
    IF    '${type}' == 'col'
        ${cell_pos}=    Get Substring    ${cell_id}    5    6    # column position
    END
    ${value}=    Get Value    ${cell}
    Run Keyword If    "${cell_pos}" == "${target}" and "${value}" != ''    Append To List    ${numbers}    ${value}

Get Numbers In Column
    [Arguments]    ${col}
    ${numbers}=    Create List
    ${cells}=    Get WebElements    css:.sudokuGrid input[type="text"]
    FOR    ${cell}    IN    @{cells}
        ${cell_id}=    Get Element Attribute    ${cell}    id
        Run Keyword If    '${cell_id}' != ''    Append Cell Value To List    ${cell_id}    ${cell}    ${numbers}    ${col}    col
    END
    RETURN    ${numbers}

Generate New Sudoku
    Click Button    ${EASY_BUTTON_ID}
    Sleep        2s
    Wait Until Page Contains Element    css:.sudokuGrid

Read Sudoku Board
    ${board}=    Create List
    FOR    ${row}    IN RANGE    ${GRID_SIZE}
        ${current_row}=    Create List
        FOR    ${col}    IN RANGE    ${GRID_SIZE}
            ${cell_id}=    Evaluate    "cell${row}${col}"
            ${value}=    Get Value    id=${cell_id}
            # If the value is empty or 0, set it to 0, otherwise convert to integer
            ${number}=    Run Keyword If    '${value}' in ['', '0']    
            ...               Set Variable    0    
            ...               ELSE            Convert To Integer    ${value}

            Append To List    ${current_row}    ${number}
        END
        Append To List    ${board}    ${current_row}
    END

    # For some reason the board stays as a string, so we need to convert it to integers
    FOR    ${r}    IN RANGE    ${GRID_SIZE}
        FOR    ${c}    IN RANGE    ${GRID_SIZE}
            ${int_value}=    Convert To Integer    ${board}[${r}][${c}]
            Set List Value    ${board}[${r}]    ${c}    ${int_value}
        END
    END
    RETURN    ${board}

Solve Sudoku
    [Arguments]    ${board}
    ${solved_board}=     Solve Sudoku Board   ${board}
    RETURN    ${solved_board}

Input Solved Board
    [Arguments]    ${solved_board}
    FOR    ${row}    IN RANGE    ${GRID_SIZE}
        FOR    ${col}    IN RANGE    ${GRID_SIZE}
            ${cell_id}=    Evaluate    "cell${row}${col}"
            ${value}=    Get Value    id=${cell_id}
            Run Keyword If    '${value}' == ''    Input Text    id=${cell_id}    ${solved_board}[${row}][${col}]
        END
    END

Validate Sudoku Completion
    ${cells}=    Get WebElements    css:.sudokuGrid input[type="text"]
    FOR    ${cell}    IN    @{cells}
        ${value}=    Get Value    ${cell}
        Should Not Be Empty    ${value}
    END