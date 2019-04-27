import * as React from 'react';
import classNames from 'classnames';
import * as style from './style.css';
import ReactDOM, { findDOMNode } from 'react-dom';
import { values, first, last } from 'lodash';
interface IProps<T> {
  onSelect: (item: T) => void;
  onRemove: (item: T) => void;
  items: IDropdownItem<T>[];
  placeholder?: string;
  component?: (item: T) => JSX.Element;
  label: string;
}
interface IState<T> {
  selectedItem: IDropdownItem<T> | null;
  focus: boolean;
  queryString: string;
  filtredItems: IDropdownItem<T>[];
}

interface IDropdownItem<T> {
  label: string;
  description: string | JSX.Element;
  value: T;
}

class SearchSelect<T> extends React.Component<IProps<T>, IState<T>> {
  private inputRef: React.RefObject<HTMLInputElement>;
  public constructor(props: IProps<T>) {
    super(props);
    this.state = {
      focus: false,
      selectedItem: null,
      filtredItems: props.items,
      queryString: ''
    };
    this.inputRef = React.createRef();
  }

  private renderSelectedItem() {
    if (this.state.selectedItem) {
      if (this.props.component) {
        return this.props.component(this.state.selectedItem.value);
      } else {
        return (
          <div className={style['list-item-selected']}>
            <div className={style['list-item-content']}>
              <div className={style['list-item-title']}>{this.state.selectedItem.label}</div>
              <div className={style['list-item-description']} />

              {this.state.selectedItem.description}
            </div>
            <div onClick={() => this.onSelect(null)} className={style['list-item-remove']}>
              X
            </div>
          </div>
        );
      }
    }
    return null;
  }
  public renderInput() {
    if (!this.state.selectedItem) {
      const classes = classNames(style['search-input']);
      return (
        <input
          onChange={this.onInputChanges}
          onKeyDown={this.onKeyDown}
          value={this.state.queryString}
          ref={this.inputRef}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className={classes}
          type="text"
          placeholder={this.props.placeholder}
        />
      );
    }
    return null;
  }
  public render() {
    return (
      <div className={style['search-select-wrapper']}>
        <div className="search-label">{this.props.label}</div>
        <div className={style['search-select']}>
          {this.renderSelectedItem()}
          {this.renderInput()}

          {this.state.focus ? (
            <div className={style.list}>
              {this.state.filtredItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    ref={`item_${index}`}
                    onClick={(evt) => {
                      evt.stopPropagation();
                      this.onSelect(item);
                    }}
                    onMouseEnter={(evt)=>{
                      this.activeElement = values(this.refs).find((v) => {
                        return v === evt.currentTarget;
                      });
                    }}
                    onMouseOver={(evt) => {
                  
                      evt.currentTarget.className = classNames(style['list-item'], {
                        [style['selected-item']]: true
                      });
                    }}
                    onMouseLeave={(evt) => {
                      evt.currentTarget.className = classNames(style['list-item']);
                    }}
                    className={classNames(style['list-item'], {
                      [style['selected-item']]: item === this.state.selectedItem
                    })}
                  >
                    <div>
                      <div className={style['list-item-title']}>{item.label}</div>
                      <div className={style['list-item-description']}>{item.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  private onSelect = (selectedItem: IDropdownItem<T> | null) => {
    const current = this.state.selectedItem;
    this.setState(
      {
        selectedItem,
        focus: false
      },
      () => {
        if (selectedItem) {
          this.props.onSelect && this.props.onSelect(selectedItem.value);
        } else {
          ReactDOM.findDOMNode(this.inputRef.current).focus();
          this.props.onRemove && current && this.props.onRemove(current.value);
        }
      }
    );
  };
  private onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      this.setState({
        focus: false,
        queryString: '',
        filtredItems: this.props.items
      });
      this.activeElement = null;
    }, 300);
  };
  private onFocus = () => {
    this.setState({
      focus: true
    });
  };
  private activeElement: any;
  private calculateActiveElement(refs: any[]) {
    let found = false;
    if (!this.activeElement) {
      this.activeElement = first(refs);
    } else {
      this.activeElement.dispatchEvent(
        new MouseEvent('mouseout', {
          bubbles: true,
          cancelable: true
        })
      );
      for (const t of refs) {
        if (this.activeElement === t) {
          found = true;
        } else if (found) {
          this.activeElement = t;
          break;
        }
      }
    }

    if (this.activeElement) {
      const event = new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true
      });
      this.activeElement.dispatchEvent(event);
      this.activeElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }
  private onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.keyCode) {
      case 40:
        {
          this.calculateActiveElement(values(this.refs));
        }
        break;

      case 38:
        {
          this.calculateActiveElement(values(this.refs).reverse());
        }

        break;
      case 13:
        {
          if (this.activeElement) {
            const event = new MouseEvent('click', {
              bubbles: true,
              cancelable: true
            });
            this.activeElement.dispatchEvent(event);
          }
        }

        break;
    }
  };
  private onInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value ? event.target.value.toLowerCase() : '';
    const filtredItems = this.props.items.filter((x) => x.label.toLowerCase().includes(q));
    this.setState({ queryString: event.target.value, filtredItems });
  };
}
export default SearchSelect;
