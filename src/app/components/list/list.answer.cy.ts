import { ListComponent } from './list.component';
import { ItemComponent } from '../item/item.component';
import { createStore } from '../../store';
import { FILTERS } from '../../constants/filter';
// @ts-ignore
import threeItems from '../../../../cypress/fixtures/three-items.json';
import { StoreModule } from '@ngrx/store';

it('shows the items', () => {
  // create a store for testing
  // using a list of todos from a fixture file
  const store = createStore({
    todos: threeItems,
    filter: FILTERS.all
  });
  // mount the ListComponent
  // - declare the item component
  // - pass the created store via imports
  // - pass a stub as the handleUpdate prop
  cy.mount(ListComponent, {
    declarations: [ItemComponent],
    imports: [StoreModule.forRoot(store)],
    componentProperties: {
      handleUpdate: cy.stub().as('handleUpdate')
    }
  });
  // confirm the todo items are shown correctly
  // - number
  // - text
  // - completed or not
  threeItems.forEach((item, k) => {
    cy.get('.todo')
      .eq(k)
      .should('have.text', item.title)
      .and(
        item.completed ? 'have.class' : 'not.have.class',
        'completed'
      );
  });
  // if we complete the first item, we should get an event
  cy.get('.todo').first().find('.toggle').check();
  cy.get('@handleUpdate')
    .should('have.been.calledOnce')
    .its('firstCall.args.0', { timeout: 0 })
    .should('deep.include', {
      id: threeItems[0].id,
      completed: true
    });
});
