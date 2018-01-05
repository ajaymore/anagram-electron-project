import React, { Component } from "react";
import Typography from "material-ui/Typography";
import uuidV4 from "uuid/v4";
import Button from "material-ui/Button";
import { FormattedMessage, FormattedNumber } from "react-intl";
import IconButton from "material-ui/IconButton";
import Icon from "material-ui/Icon";
import Paper from "material-ui/Paper";
import ConfirmDialog from "./ConfirmDialog";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import NewVocabulary from "./NewVocabulary";
import UploadVocabulary from "./UploadVocabulary";
import AreYouSure from "./AreYouSure";

const parsedVocabularies = lang => {
  const vocabularies = JSON.parse(localStorage.getItem("vocabularies"));
  if (!vocabularies) return {};
  let parsed = {};
  vocabularies.forEach(element => {
    if (element.lang === lang) {
      parsed = element.categories.reduce((obj, ele, i) => {
        obj[ele.categoryName] = ele.categoryValue;
        return obj;
      }, {});
    }
  });
  return parsed;
};

const getAsText = (fileToRead, cb) => {
  var reader = new FileReader();
  // Read file into memory as UTF-8
  reader.readAsText(fileToRead);
  // Handle errors load
  reader.onload = event => {
    var csv = event.target.result;
    cb(processData(csv));
  };
  reader.onerror = errorHandler;
};

const processData = csv => {
  var allTextLines = csv.split(/\r\n|\n/);
  var lines = [];
  for (var i = 0; i < allTextLines.length; i++) {
    var data = allTextLines[i].split(";");
    var tarr = [];
    for (var j = 0; j < data.length; j++) {
      tarr.push(data[j]);
    }
    lines.push(tarr);
  }
  return lines;
};

const errorHandler = evt => {
  if (evt.target.error.name === "NotReadableError") {
    alert("Canno't read file !");
  }
};

const addVocabulary = (categoryName, selectLang) => {
  if (window.localStorage.getItem("vocabularies")) {
    let vocabularies = JSON.parse(window.localStorage.getItem("vocabularies"));
    const langs = vocabularies.map(item => item.lang);
    if (langs.indexOf(selectLang) === -1) {
      vocabularies = [
        ...vocabularies,
        {
          lang: selectLang,
          categories: [
            {
              categoryName: categoryName.toUpperCase(),
              categoryValue: [{ id: uuidV4(), text: "", comment: "" }]
            }
          ]
        }
      ];
    } else {
      vocabularies = vocabularies.map(item => {
        if (selectLang === item.lang) {
          return {
            ...item,
            categories: [
              ...item.categories,
              {
                categoryName: categoryName.toUpperCase(),
                categoryValue: [{ id: uuidV4(), text: "", comment: "" }]
              }
            ]
          };
        }
        return item;
      });
    }
    window.localStorage.setItem("vocabularies", JSON.stringify(vocabularies));
  } else {
    let vocabularies = [
      {
        lang: selectLang,
        categories: [
          {
            categoryName: categoryName.toUpperCase(),
            categoryValue: [{ id: uuidV4(), text: "", comment: "" }]
          }
        ]
      }
    ];
    window.localStorage.setItem("vocabularies", JSON.stringify(vocabularies));
  }
};

const addWords = (words, selectLang, categorySelected) => {
  let vocabularies = JSON.parse(window.localStorage.getItem("vocabularies"));
  vocabularies = vocabularies.map(item => {
    if (selectLang === item.lang) {
      return {
        ...item,
        categories: item.categories.map(category => {
          if (category.categoryName === categorySelected.toUpperCase()) {
            return {
              ...category,
              categoryValue:
                category.categoryValue[0].comment === "" &&
                category.categoryValue[0].text === ""
                  ? words
                  : [...category.categoryValue, ...words]
            };
          }
          return category;
        })
      };
    }
    return item;
  });
  window.localStorage.setItem("vocabularies", JSON.stringify(vocabularies));
};

const addWordsReplace = (words, selectLang, categorySelected) => {
  let vocabularies = JSON.parse(window.localStorage.getItem("vocabularies"));
  vocabularies = vocabularies.map(item => {
    if (selectLang === item.lang) {
      return {
        ...item,
        categories: item.categories.map(category => {
          if (category.categoryName === categorySelected) {
            return {
              ...category,
              categoryValue: words
            };
          }
          return category;
        })
      };
    }
    return item;
  });
  window.localStorage.setItem("vocabularies", JSON.stringify(vocabularies));
};

const getEncodeUri = (item, vocab) => {
  var csvContent = "data:text/csv;charset=utf-8,text,comment\n";
  vocab.forEach(function(element, index) {
    if (!element.text || !element.comment) return;
    const dataString = `${element.text
      .replace(",", "")
      .replace('"', "")},${element.comment.replace(",", "").replace('"', "")}`;
    csvContent += index < vocab.length ? dataString + "\n" : dataString;
  });
  return encodeURI(csvContent);
};

const removeVocab = (selectlang, name) => {
  let vocabularies = JSON.parse(window.localStorage.getItem("vocabularies"));
  vocabularies = vocabularies.map(item => {
    if (selectlang === item.lang) {
      return {
        ...item,
        categories: item.categories.filter(
          category => category.categoryName !== name
        )
      };
    }
    return item;
  });
  window.localStorage.setItem("vocabularies", JSON.stringify(vocabularies));
};

class Settings extends Component {
  state = {
    vocabs: parsedVocabularies(this.props.langCode),
    newVocabName: "",
    selectedVocab: [],
    selectedVocabName: "",
    emptyVocab: ""
  };
  componentDidMount() {}

  handleFiles = e => {
    const files = e.target.files;
    if (window.FileReader) {
      getAsText(files[0], data => {
        this.setState({ csvContent: data.map(item => item[0].split(",")) });
      });
    } else {
      alert("FileReader are not supported in this browser.");
    }
  };

  selectVocab = selectedVocab => {
    if (this.state.selectedVocabName === selectedVocab) {
      return;
    } else if (this.state.selectedVocabName) {
      this.save();
    }
    this.setState({
      selectedVocabName: selectedVocab,
      selectedVocab: this.state.vocabs[selectedVocab]
    });
  };

  onTextChange = e => {
    const selectedVocab = this.state.selectedVocab;
    selectedVocab[parseInt(e.target.name, 10)].text = e.target.value;
    this.setState({ selectedVocab });
  };

  onCommentChange = e => {
    const selectedVocab = this.state.selectedVocab;
    selectedVocab[parseInt(e.target.name, 10)].comment = e.target.value;
    this.setState({ selectedVocab });
  };

  remove = i => {
    let selectedVocab = this.state.selectedVocab;
    if (selectedVocab.length === 1) return;
    selectedVocab.splice(i, 1);
    this.setState({ selectedVocab });
  };

  addOne = () => {
    const selectedVocab = this.state.selectedVocab;
    selectedVocab.unshift({ id: uuidV4(), text: "", comment: "" });
    this.setState({ selectedVocab });
  };

  save = () => {
    const selectedVocab = this.state.selectedVocab;
    addWordsReplace(
      selectedVocab,
      this.props.langCode,
      this.state.selectedVocabName
    );
    this.setState({
      selectedVocab: [],
      selectedVocabName: "",
      vocabs: parsedVocabularies(this.props.langCode)
    });
  };

  addEmptyVocabulary = () => {
    if (!this.state.emptyVocab || this.state.emptyVocab.length < 3) {
      return;
    }

    if (Object.keys(this.state.vocabs).indexOf(this.state.emptyVocab) === -1) {
      addVocabulary(this.state.emptyVocab, this.props.langCode);
    }

    this.setState({
      emptyVocab: "",
      vocabs: parsedVocabularies(this.props.langCode)
    });
  };

  addVocabulary = () => {
    if (
      !this.state.csvContent ||
      !this.state.newVocabName ||
      this.state.newVocabName.length > 40 ||
      this.state.newVocabName.length < 3
    )
      return;
    const { csvContent, newVocabName } = this.state;
    const csvContentSplice = csvContent.slice(1);
    const words = csvContentSplice
      .filter(item => item[0] && item[1])
      .map(item => ({
        id: uuidV4(),
        text: item[0],
        comment: item[1]
      }));
    if (Object.keys(this.state.vocabs).indexOf(newVocabName) === -1) {
      addVocabulary(this.state.newVocabName, this.props.langCode);
    }
    addWords(words, this.props.langCode, newVocabName);
    this.setState({
      vocabs: parsedVocabularies(this.props.langCode),
      newVocabName: ""
    });
    this.setState({ message: "uploadSucess", title: "message" });
  };

  dialogCancel = () => {
    this.setState({
      message: "",
      title: ""
    });
  };

  removeVocab = name => {
    if (this.state.selectedVocabName === name) {
      this.setState({
        title: "message",
        message: "cannotDelete"
      });
      return;
    }
    removeVocab(this.props.langCode, name);
    this.setState({
      vocabs: parsedVocabularies(this.props.langCode)
    });
    window.localStorage.setItem("currentIndex", 0);
  };

  done = () => {
    this.props.done();
  };

  render() {
    const { message, title } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          boxSizing: "border-box",
          height: window.innerHeight
        }}
      >
        {message && title ? (
          <ConfirmDialog
            message={message}
            title={title}
            cancel={this.dialogCancel}
          />
        ) : null}
        <div style={{ flex: 1 }}>
          <AppBar position="static">
            <Toolbar
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography type="display1" style={{ color: "#fff" }}>
                <FormattedMessage id="settings" />
              </Typography>
              <Button raised color="accent" onClick={this.done}>
                <FormattedMessage id="done" />
              </Button>
            </Toolbar>
          </AppBar>
          <div
            style={{
              display: "flex",
              overflowY: "auto",
              height: 85,
              margin: "20px 30px 0"
            }}
          >
            <div style={{ display: "flex" }}>
              {Object.keys(this.state.vocabs).length
                ? Object.keys(this.state.vocabs).map((item, i) => (
                    <Paper
                      elevation={4}
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        marginRight: 20,
                        height: 50
                      }}
                    >
                      <Button
                        style={{
                          alignSelf: "center",
                          marginLeft: 10
                        }}
                        color={
                          this.state.selectedVocabName === item
                            ? "accent"
                            : "primary"
                        }
                        onClick={this.selectVocab.bind(this, item)}
                      >
                        {item}
                      </Button>
                      <a
                        style={{ textDecoration: "none" }}
                        href={getEncodeUri(item, this.state.vocabs[item])}
                        download={`${item}.csv`}
                      >
                        <IconButton color="accent" aria-label="download">
                          <Icon>file_download</Icon>
                        </IconButton>
                      </a>
                      <AreYouSure action={this.removeVocab.bind(this, item)} />
                    </Paper>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div style={{ flex: 5, display: "flex", flexDirection: "column" }}>
          {this.state.selectedVocab.length
            ? [
                <div style={{ textAlign: "center", marginTop: 15 }} key={1}>
                  <Button raised onClick={this.addOne}>
                    <FormattedMessage id="add" />
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button raised accent="primary" onClick={this.save}>
                    <FormattedMessage id="save" />
                  </Button>
                </div>,
                <div style={{ marginTop: 20, overflowY: "auto" }} key={2}>
                  {this.state.selectedVocab.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-around"
                      }}
                    >
                      <Typography
                        style={{
                          alignSelf: "center",
                          flex: 1,
                          textAlign: "center"
                        }}
                      >
                        <FormattedNumber value={i + 1} />
                      </Typography>
                      <FormattedMessage id="textinput">
                        {msg => (
                          <input
                            style={{
                              outline: "none",
                              flex: 3,
                              border: "none",
                              borderBottom: "1px solid",
                              height: 20,
                              marginRight: 20,
                              padding: "10px 30px 10px 0"
                            }}
                            name={`${i}`}
                            value={item.text}
                            onChange={this.onTextChange}
                            placeholder={msg}
                          />
                        )}
                      </FormattedMessage>
                      <FormattedMessage id="hint">
                        {msg => (
                          <textarea
                            style={{
                              outline: "none",
                              flex: 5,
                              border: "none",
                              borderBottom: "1px solid",
                              height: 20,
                              padding: "10px 0 10px 0"
                            }}
                            name={`${i}`}
                            value={item.comment}
                            rows="4"
                            onChange={this.onCommentChange}
                            placeholder={msg}
                          />
                        )}
                      </FormattedMessage>

                      <IconButton
                        style={{ flex: 1, alignSelf: "flex-end" }}
                        color="accent"
                        aria-label="remove"
                        onClick={this.remove.bind(this, i)}
                      >
                        <Icon>delete</Icon>
                      </IconButton>
                    </div>
                  ))}
                </div>
              ]
            : null}
        </div>
        <div
          style={{
            flex: 0.81,
            flexDirection: "row",
            display: "flex",
            marginBottom: 0,
            justifyContent: "center"
          }}
        >
          <NewVocabulary
            onChange={e => this.setState({ emptyVocab: e.target.value })}
            addVocab={this.addEmptyVocabulary}
            value={this.state.emptyVocab}
          />&nbsp;&nbsp;&nbsp;&nbsp;
          <UploadVocabulary
            onChange={e => this.setState({ newVocabName: e.target.value })}
            addVocab={this.addVocabulary}
            value={this.state.newVocabName}
            fileHandle={this.handleFiles}
          />
        </div>
      </div>
    );
  }
}

export default Settings;
