const randomId = () => {
	return Math.random().toString(36).slice(2)
}

const messageCard = ({ messageId, parentId }) => {
	return `
		<div class="card p-3 my-4 message-card" id="${messageId}" data-parent-id="${parentId}">
  		<div class="row">
  			<div class="col-6">
  				<label>Message</label>
  				<div class="my-2">
  					<textarea class="form-control" rows="6" id="message-${messageId}"></textarea>
  				</div>
  			</div>
  			<div class="col-6">
  				<label>Key Reference</label>
  				<div class="my-2">
  					<input type="text" class="form-control" placeholder="Placeholder" id="key-reference-${messageId}">
  				</div>

  				<label>Type</label>
  				<div class="my-2">
  					<select class="form-select" id="type-${messageId}">
						  <option selected value="text">Text</option>
						  <option value="text_image">Text Image</option>
						  <option value="end">End</option>
						  <option value="home">Home</option>
						  <option value="files">Files</option>
						</select>
  				</div>

  				<div class="d-flex justify-content-end gap-2">
  					<button type="button" class="btn btn-primary" onclick="addCardChild('${messageId}')">Add Child</button>
  					<button class="btn btn-outline-danger" onclick="removeMessage('${messageId}')">&#x2715</button>
  				</div>
  			</div>
  		</div>
  	</div>
	`
}

function createWrapper(messageId, parentId = 0) {
	const wrapper = document.createElement('div')

	wrapper.setAttribute('id', `card-wrap-${messageId}`)
	wrapper.classList.add('px-5')
	wrapper.innerHTML = messageCard({ messageId, parentId })

	return wrapper
}

function renderNewCard(data) {
	const messageId = randomId()
	const cardsWrapper = document.querySelector('.cards-wrapper')
	const wrapper = createWrapper(messageId)

	cardsWrapper.appendChild(wrapper)

	document.getElementById(messageId).scrollIntoView({
		behavior: 'auto',
    block: 'center',
    inline: 'center'
	});
}

function addCardChild(parentId) {
	const messageId = randomId()
	const parentCardWrapper = document.getElementById(`card-wrap-${parentId}`)
	const wrapper = createWrapper(messageId, parentId)

	parentCardWrapper.appendChild(wrapper)

	document.getElementById(messageId).scrollIntoView({
		behavior: 'auto',
    block: 'center',
    inline: 'center'
	});
}

function removeMessage(messageId) {
	document.getElementById(`card-wrap-${messageId}`).remove()
}

function saveFlow() {
	let result = []
	const messageCards = document.querySelectorAll('.message-card')

	messageCards.forEach(card => {
		result.push({
			messageId: card.id,
			parentId: card.dataset.parentId,
			message: document.querySelector(`#message-${card.id}`).value,
			placeholder: document.querySelector(`#key-reference-${card.id}`).value,
			type: document.querySelector(`#type-${card.id}`).value
		})
	})

	console.log(result)
}